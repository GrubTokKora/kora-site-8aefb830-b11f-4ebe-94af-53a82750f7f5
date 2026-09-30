window.KORA_SITE_CONFIG = {
  apiBaseUrl: "https://kora-agent.grubtok.com",
  businessId: "8aefb830-b11f-4ebe-94af-53a82750f7f5",
  recaptchaSiteKey: "6LcsdJYsAAAAAAur-h7cYlZuGJTmijNHmOi5kFH7",
};

function setFormStatus(form, text, kind) {
  const statusEl = form.querySelector(".form-status, [data-form-status]");
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle("is-visible", Boolean(text));
  statusEl.classList.remove(
    "form-status--error",
    "form-status--success",
    "form-status--neutral",
    "is-error",
    "is-success"
  );
  if (kind === "error") statusEl.classList.add("form-status--error", "is-error");
  else if (kind === "success") statusEl.classList.add("form-status--success", "is-success");
  else if (kind) statusEl.classList.add("form-status--neutral");
}

function setSubmittingState(form, isSubmitting, busyLabel) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent || "Submit";
    submitBtn.textContent = busyLabel || "Sending...";
    submitBtn.disabled = true;
    return;
  }
  submitBtn.textContent = submitBtn.dataset.originalText || "Submit";
  submitBtn.disabled = false;
}

function parseApiError(data, fallback) {
  const detail = data && data.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const joined = detail.map((d) => d.msg || d.message || "").filter(Boolean).join(" ");
    if (joined) return joined;
  }
  if (data && typeof data.message === "string" && data.message.trim()) return data.message;
  return fallback;
}

let recaptchaScriptPromise = null;
const RECAPTCHA_W = 304;
const RECAPTCHA_H = 78;
const responsiveRecaptchaBoxes = [];

function scaleRecaptcha(box) {
  const wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains("g-recaptcha-scale")) return;
  const available = wrap.clientWidth;
  if (!available) return;
  const scale = Math.min(1, available / RECAPTCHA_W);
  box.style.transform = scale < 1 ? "scale(" + scale.toFixed(4) + ")" : "none";
  wrap.style.height = Math.ceil(RECAPTCHA_H * scale) + "px";
}

function makeRecaptchaResponsive(box) {
  if (!box || box.dataset.koraRecaptchaResponsive === "true") return;
  box.dataset.koraRecaptchaResponsive = "true";

  let wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains("g-recaptcha-scale")) {
    wrap = document.createElement("div");
    wrap.className = "g-recaptcha-scale";
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);
  }

  scaleRecaptcha(box);
  const observer = new MutationObserver(() => scaleRecaptcha(box));
  observer.observe(box, { childList: true, subtree: true });
  responsiveRecaptchaBoxes.push(box);
}

let recaptchaResizeTimer = null;
window.addEventListener("resize", () => {
  window.clearTimeout(recaptchaResizeTimer);
  recaptchaResizeTimer = window.setTimeout(() => {
    responsiveRecaptchaBoxes.forEach(scaleRecaptcha);
  }, 150);
});

function ensureRecaptchaScript(siteKey) {
  if (!siteKey) return Promise.resolve();
  if (typeof window.grecaptcha !== "undefined") return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;
  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kora-recaptcha="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.koraRecaptcha = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });
  return recaptchaScriptPromise;
}

function getRecaptchaToken(form) {
  if (typeof window.grecaptcha === "undefined") return "";
  const recaptchaEl = form.querySelector(".g-recaptcha");
  if (!recaptchaEl) return "";
  return window.grecaptcha.getResponse() || "";
}

function resetRecaptcha(form) {
  if (typeof window.grecaptcha === "undefined") return;
  if (form.querySelector(".g-recaptcha")) window.grecaptcha.reset();
}

/**
 * Kora public forms API — POST {apiBaseUrl}/api/v1/public/forms/submit
 * Requires reCAPTCHA v2 token (captcha_token) + business_id matching the Kora site.
 */
function initContactForm() {
  const form = document.getElementById("contact-form") || document.querySelector("[data-contact-form]");
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "true";

  const config = window.KORA_SITE_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || "").replace(/\/+$/, "");
  const businessId = config.businessId || "";
  const recaptchaSiteKey = (config.recaptchaSiteKey || "").trim();
  const recaptchaEl = form.querySelector(".g-recaptcha");

  if (recaptchaEl && recaptchaSiteKey) {
    recaptchaEl.setAttribute("data-sitekey", recaptchaSiteKey);
    makeRecaptchaResponsive(recaptchaEl);
    form.addEventListener(
      "focusin",
      () => {
        ensureRecaptchaScript(recaptchaSiteKey).catch(() => {
          setFormStatus(form, "Security check failed to load. Please refresh and try again.", "error");
        });
      },
      { once: true }
    );
  } else if (recaptchaEl && !recaptchaSiteKey) {
    recaptchaEl.style.display = "none";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = ((form.querySelector('[name="name"]') || {}).value || "").trim();
    const email = ((form.querySelector('[name="email"]') || {}).value || "").trim();
    const phone = ((form.querySelector('[name="phone"]') || {}).value || "").trim();
    const topic = ((form.querySelector('[name="topic"]') || {}).value || "").trim();
    const message = ((form.querySelector('[name="message"]') || {}).value || "").trim();

    if (!name || !email || !message) {
      setFormStatus(form, "Please fill in your name, email, and message.", "error");
      return;
    }

    if (!businessId || !apiBaseUrl) {
      setFormStatus(form, "Form submission is not configured for this site.", "error");
      return;
    }

    if (recaptchaEl && !recaptchaSiteKey) {
      setFormStatus(form, "Form temporarily unavailable.", "error");
      return;
    }

    if (recaptchaEl && recaptchaSiteKey) {
      try {
        await ensureRecaptchaScript(recaptchaSiteKey);
      } catch (err) {
        setFormStatus(form, "Security check failed to load. Please refresh and try again.", "error");
        return;
      }
      const captchaCheck = getRecaptchaToken(form);
      if (!captchaCheck) {
        setFormStatus(form, "Please complete the security check.", "error");
        return;
      }
    }

    const captchaToken = getRecaptchaToken(form);
    setSubmittingState(form, true, "Sending...");
    setFormStatus(form, "Sending...", "neutral");

    const formData = {
      name: name,
      email: email,
      message: topic ? `[${topic}] ${message}` : message,
    };
    if (phone) formData.phone = phone;
    if (topic) formData.topic = topic;

    try {
      const response = await fetch(apiBaseUrl + "/api/v1/public/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          form_type: "contact",
          form_data: formData,
          submitter_email: email,
          captcha_token: captchaToken || "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          parseApiError(data, "Something went wrong. Please try again or call us at 203.348.0622.")
        );
      }
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, data.message || "Thank you! Your message has been received.", "success");
    } catch (error) {
      resetRecaptcha(form);
      setFormStatus(
        form,
        (error && error.message) || "Something went wrong. Please try again or call us at 203.348.0622.",
        "error"
      );
    } finally {
      setSubmittingState(form, false);
    }
  });
}

/* Casa Villa interactions */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Scroll reveals
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-in"));
    }

    // Menu: the menus are drawn by Kora into the page (kora:data:menu). Here the "All Day" categories
    // become picture tiles that open a dialog, and each menu gets its order buttons.
    const links = window.CV_LINKS || {};
    const CATEGORY_LOOK = {
      "For the Table": {
            "id": "appetizers",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097622_deld33.jpg"
      },
      "From the Garden": {
            "id": "salads",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097676_1jxkwc.jpg"
      },
      "Chef's Specials": {
            "id": "chefs-specials",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097683_kubq47.jpg"
      },
      "From the Sea": {
            "id": "from-the-sea",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097839_2o8pjm.jpg"
      },
      "On the Land": {
            "id": "on-the-land",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097650_ay3k1s.jpg"
      },
      "Vegetarian Corner": {
            "id": "vegetarian",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097839_2o8pjm.jpg"
      },
      "Tacos": {
            "id": "tacos",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097853_t079c0.jpg"
      },
      "Soups": {
            "id": "soups",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097848_cjjzrh.jpg"
      },
      "Sides": {
            "id": "sides",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097844_6wm6b9.jpg"
      },
      "Dessert": {
            "id": "desserts",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097685_xn897k.jpg"
      },
      "Non-Alcoholic Drinks": {
            "id": "drinks",
            "image": "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097672_hej78l.jpg"
      }
};
    const modal = document.querySelector("[data-menu-modal]");
    const modalMedia = document.querySelector("[data-modal-media]");
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalItems = document.querySelector("[data-modal-items]");
    const modalClose = document.querySelector("[data-modal-close]");

    function textOf(root, selector) {
      const el = root.querySelector(selector);
      return el ? el.textContent.trim() : "";
    }

    function openCat(sectionId) {
      const section = document.getElementById(sectionId);
      if (!section || !modal) return;
      const name = textOf(section, ".kora-menu__section-title");
      const look = CATEGORY_LOOK[name] || {};
      modalTitle.textContent = name;
      // write background into code (not an <img>)
      modalMedia.style.backgroundImage = look.image ? `url("${look.image}")` : "";
      modalMedia.setAttribute("data-cat", look.id || "");
      modalItems.textContent = "";
      section.querySelectorAll(".kora-menu__item").forEach((li) => {
        const article = document.createElement("article");
        article.className = "menu-item";
        const title = document.createElement("h3");
        title.textContent = textOf(li, ".kora-menu__item-name");
        const price = document.createElement("div");
        price.className = "price";
        price.textContent = textOf(li, ".kora-menu__item-price");
        const desc = document.createElement("p");
        desc.textContent = textOf(li, ".kora-menu__item-desc");
        article.append(title, price, desc);
        modalItems.appendChild(article);
      });
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      modalClose && modalClose.focus();
    }
    function closeModal() {
      if (!modal) return;
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    const allDay = document.getElementById("menu-all-day-menu");
    if (allDay) {
      const grid = document.createElement("div");
      grid.className = "category-grid reveal";
      allDay.querySelectorAll(".kora-menu__section").forEach((section) => {
        const name = textOf(section, ".kora-menu__section-title");
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "cat-tile";
        tile.setAttribute("data-cat", (CATEGORY_LOOK[name] || {}).id || "");
        tile.setAttribute("data-open-cat", section.id);
        tile.setAttribute("aria-label", "View " + name + " menu");
        tile.innerHTML = "<em>Explore</em><span></span>";
        tile.querySelector("span").textContent = name;
        grid.appendChild(tile);
      });
      allDay.classList.add("has-tiles");
      allDay.appendChild(grid);
    }

    const ORDER_BUTTONS = {
      "menu-all-day-menu": [{ label: "Order Regular Menu", attr: "data-order-regular", href: "https://casavilla2.onlineordersnow.com/MenuDisplay", cls: "btn btn-primary" }],
      "menu-lunch-menu": [{ label: "Order Lunch Online", attr: "data-order-regular", href: "https://casavilla2.onlineordersnow.com/MenuDisplay", cls: "btn btn-primary" }],
      "menu-catering-menu": [
        { label: "Order Catering", attr: "data-order-catering", href: "https://casavillacatering.onlineordersnow.com/MenuDisplay", cls: "btn btn-primary" },
        { label: "Call 203.323.1721", href: "tel:2033231721", cls: "btn btn-dark" },
      ],
    };
    Object.keys(ORDER_BUTTONS).forEach((menuId) => {
      const menuEl = document.getElementById(menuId);
      if (!menuEl) return;
      const row = document.createElement("div");
      row.className = "menu-actions";
      ORDER_BUTTONS[menuId].forEach((b) => {
        const a = document.createElement("a");
        a.className = b.cls;
        a.href = b.href;
        a.textContent = b.label;
        if (b.attr) a.setAttribute(b.attr, "");
        if (!b.href.startsWith("tel:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        row.appendChild(a);
      });
      menuEl.appendChild(row);
    });

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-open-cat]");
      if (t) openCat(t.getAttribute("data-open-cat"));
      if (e.target === modal) closeModal();
    });
    modalClose && modalClose.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // Wire order CTAs
    document.querySelectorAll("[data-order-regular]").forEach((a) => {
      a.href = links.ORDER_REGULAR || a.href;
    });
    document.querySelectorAll("[data-order-catering]").forEach((a) => {
      a.href = links.ORDER_CATERING || a.href;
    });

    // Gallery lightbox
    const lb = document.querySelector("[data-lightbox]");
    const lbImg = document.querySelector("[data-lightbox-img]");
    const lbClose = document.querySelector("[data-lightbox-close]");
    document.querySelectorAll("[data-gallery-item]").forEach((el) => {
      el.addEventListener("click", () => {
        const src = getComputedStyle(el).backgroundImage.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
        if (!src || !lb) return;
        lbImg.src = src;
        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLb() {
      if (!lb) return;
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    lbClose && lbClose.addEventListener("click", closeLb);
    lb && lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });

    initContactForm();

    // Newsletter subscribe form
    var nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cfg = window.KORA_CONFIG || window.KORA_SITE_CONFIG || {};
        var apiBaseUrl = (cfg.apiBaseUrl || '').replace(/\/+$/, '');
        var businessId = cfg.businessId;
        var emailEl = document.getElementById('newsletter-email');
        var phoneEl = document.getElementById('newsletter-phone');
        var emailOpt = document.getElementById('newsletter-email-optin');
        var smsOpt = document.getElementById('newsletter-sms-optin');
        var msgEl = document.getElementById('newsletter-message');
        var submitBtn = nlForm.querySelector('button[type="submit"]');

        var email = emailEl ? (emailEl.value || '').trim() : '';
        var phone = phoneEl ? (phoneEl.value || '').trim() : '';
        var emailOptIn = emailOpt ? emailOpt.checked : false;
        var smsOptIn = smsOpt ? smsOpt.checked : false;

        function showMsg(t, err) {
          if (msgEl) {
            msgEl.textContent = t || '';
            msgEl.style.color = err ? '#f87171' : '#4ade80';
          }
        }

        if (!email && !phone) { showMsg('Please enter email or phone.', true); return; }
        if (!emailOptIn && !smsOptIn) { showMsg('Please select at least one: Email or SMS updates.', true); return; }
        if (smsOptIn && !phone) { showMsg('Please enter your phone for SMS updates.', true); return; }
        if (emailOptIn && !email) { showMsg('Please enter your email for email updates.', true); return; }
        if (!apiBaseUrl || !businessId) { showMsg('Subscription is not configured.', true); return; }

        showMsg('Subscribing...', false);
        if (submitBtn) submitBtn.disabled = true;

        fetch(apiBaseUrl + '/api/v1/public/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_id: businessId,
            email: email || null,
            phone_number: phone || null,
            email_opt_in: emailOptIn,
            sms_opt_in: smsOptIn,
            source: 'static_site_widget'
          })
        })
        .then(function (r) {
          if (r.ok) return r.json();
          throw new Error('Request failed');
        })
        .then(function (data) {
          showMsg(data.message || 'Subscribed! Thank you.', false);
          nlForm.reset();
        })
        .catch(function () {
          showMsg('Something went wrong. Please try again.', true);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
      });
    }
  });
})();
