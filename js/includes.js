/* Casa Villa shared chrome */
(function () {
  const ORDER_REGULAR = "https://casavilla2.onlineordersnow.com/MenuDisplay";
  const ORDER_CATERING = "https://casavillacatering.onlineordersnow.com/MenuDisplay";
  const PHONE = "2033480622";
  const PHONE_DISPLAY = "203.348.0622";
  const CATERING_PHONE = "2033231721";
  const MAPS = "https://www.google.com/maps/place/866+E+Main+St,+Stamford,+CT+06902/@41.0558127,-73.5276479,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2a1c5753deba9:0xa176db2666e5275b!8m2!3d41.0558127!4d-73.5254592";
  const SOCIALS = {
    facebook: "https://www.facebook.com/CasaVillaStamford/",
    instagram: "https://www.instagram.com/casavillarestaurant/",
    twitter: "https://x.com/casa_villa",
    youtube: "https://www.youtube.com/channel/UCoJQeFQuIPTkLDNSA8FF1Hw",
    yelp: "https://www.yelp.com/biz/casa-villa-restaurant-stamford",
    tiktok: "https://www.tiktok.com/@casavillarestaurant",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g33936-d1631717-Reviews-Casa_Villa_Express-Stamford_Connecticut.html",
    grubhub: "https://www.grubhub.com/restaurant/casa-villa-express-182-w-main-st-stamford/2695381"
  };

  window.CV_LINKS = { ORDER_REGULAR, ORDER_CATERING, PHONE, PHONE_DISPLAY, CATERING_PHONE, MAPS, SOCIALS };

  const icon = {
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>',
    menu: '<svg class="icon-stroke" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg class="icon-stroke" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm6.5-.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 9.2A2.8 2.8 0 1 1 12 14.8 2.8 2.8 0 0 1 12 9.2z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H21l-6.6 7.5L22 22h-6.2l-4.9-6.4L5.3 22H3.2l7-8L2 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.8.5c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.4 8.8.4 8.8.4s7.3 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"/></svg>',
    yelp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 11.3 9 3.4c-.3-.8.3-1.6 1.1-1.6h.1c.5 0 .9.3 1.1.7l4.3 8.6c.3.7-.3 1.5-1.1 1.3l-.1-.1c-.5-.1-.9-.4-1.2-1zM13.4 13.5l8.1 1.5c.8.2 1.2 1.1.8 1.8l-.1.1c-.3.4-.8.6-1.3.5l-8.4-2.7c-.7-.2-.9-1.1-.4-1.6l.1-.1c.3-.3.7-.4 1.2-.5zM12.1 14.8c.5-.2 1.1.1 1.2.6v.1c.1.5-.1 1-.5 1.2L5.8 21.5c-.7.4-1.6-.2-1.5-1v-.1c.1-.5.4-.9.8-1.1l6.9-4.5zM10.5 12.7 3.2 9.3C2.4 9 2 8.1 2.4 7.4l.1-.1c.3-.4.8-.6 1.3-.5l8.2 2.1c.7.2 1 1.1.5 1.6l-.1.1c-.3.4-.8.6-1.3.5-.2 0-.4-.1-.6-.2zM11.2 13.9c.4-.4 1.1-.3 1.4.2l.1.1c.3.5.1 1.1-.3 1.3L5.2 20c-.7.4-1.6-.2-1.5-1.1v-.1c.1-.5.4-.9.9-1.1l6.6-3.8z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3c.4 2.4 1.9 4.1 4.5 4.4v3.1c-1.6.1-3-.4-4.3-1.3v6.5c0 3.5-2.5 6.1-6.1 6.3A6.2 6.2 0 0 1 4.4 16 6.2 6.2 0 0 1 12 9.4c.3 0 .6 0 .9.1v3.3a2.9 2.9 0 1 0 2 2.8V3h1.6z"/></svg>'
  };

  function socialLinks(extra) {
    const keys = ["facebook", "instagram", "twitter", "youtube", "yelp", "tiktok"];
    return keys.map((k) => `<a href="${SOCIALS[k]}" target="_blank" rel="noopener noreferrer" aria-label="${k}">${icon[k]}</a>`).join("");
  }

  function mountTopbar(el) {
    el.innerHTML = `
      <div class="container topbar-inner">
        <div class="topbar-left">
          <a href="${MAPS}" target="_blank" rel="noopener noreferrer">${icon.pin} 866 East Main Street, Stamford, CT 06902</a>
        </div>
        <div class="topbar-right">
          <a href="tel:${PHONE}">${icon.phone} Call &amp; Order ${PHONE_DISPLAY}</a>
          <div class="topbar-socials">${socialLinks()}</div>
        </div>
      </div>`;
  }

  function mountHeader(el, page) {
    const active = (id) => (page === id ? ' aria-current="page"' : "");
    el.innerHTML = `
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Casa Villa Restaurant home">
          <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097894_7mdkr9.png" width="120" height="90" alt="Casa Villa Restaurante logo">
          <span class="brand-text"><strong>Casa Villa</strong><span>A Taste of Mexico</span></span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="index.html"${active("home")}>Home</a>
          <a href="index.html#menu"${active("menu")}>Menus</a>
          <a href="history.html"${active("history")}>Our History</a>
          <a href="contact.html"${active("contact")}>Contact</a>
          <div class="nav-dropdown nav-dropdown--cta">
            <button type="button" class="nav-cta" aria-haspopup="true" aria-expanded="false" data-order-toggle>Order Online</button>
            <div class="nav-dropdown-panel" role="menu" data-order-panel>
              <a href="${ORDER_REGULAR}" target="_blank" rel="noopener noreferrer">Regular Menu</a>
              <a href="${ORDER_CATERING}" target="_blank" rel="noopener noreferrer">Catering Menu</a>
            </div>
          </div>
        </nav>
        <button class="nav-toggle" type="button" aria-label="Open menu" data-nav-open>${icon.menu}</button>
      </div>`;
  }

  function mountMobile(el) {
    el.innerHTML = `
      <a href="index.html">Home</a>
      <a href="index.html#menu">Menus</a>
      <a href="history.html">Our History</a>
      <a href="contact.html">Contact</a>
      <a href="${ORDER_REGULAR}" target="_blank" rel="noopener noreferrer">Order Regular Menu</a>
      <a href="${ORDER_CATERING}" target="_blank" rel="noopener noreferrer">Order Catering</a>
      <a href="tel:${PHONE}">Call ${PHONE_DISPLAY}</a>`;
  }

  function mountFooter(el) {
    el.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/8aefb830-b11f-4ebe-94af-53a82750f7f5/de8c94d8-887e-4625-825f-ec262dbc28df/1786097894_7mdkr9.png" width="140" height="104" alt="Casa Villa">
            <p>Authentic Mexican cuisine in Stamford, CT — dine-in, pickup, delivery, and catering at 866 East Main Street.</p>
            <div class="footer-socials">${socialLinks()}</div>
          </div>
          <div class="footer-col">
            <h4>Visit</h4>
            <p>Casa Villa Restaurant</p>
            <a href="${MAPS}" target="_blank" rel="noopener noreferrer">866 East Main Street<br>Stamford, CT 06902</a>
            <a href="tel:${PHONE}">${PHONE_DISPLAY}</a>
          </div>
          <div class="footer-col">
            <h4>Order</h4>
            <a href="${ORDER_REGULAR}" target="_blank" rel="noopener noreferrer">Regular Menu</a>
            <a href="${ORDER_CATERING}" target="_blank" rel="noopener noreferrer">Catering Menu</a>
            <a href="${SOCIALS.grubhub}" target="_blank" rel="noopener noreferrer">Grubhub</a>
            <a href="${SOCIALS.tripadvisor}" target="_blank" rel="noopener noreferrer">Tripadvisor</a>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="index.html#about">About</a>
            <a href="history.html">Our History</a>
            <a href="contact.html">Contact Us</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Casa Villa. All rights reserved.</p>
          <p>casavillarestaurant@yahoo.com · Catering ${CATERING_PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3")}</p>
        </div>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page || "home";
    const top = document.querySelector("[data-topbar]");
    const header = document.querySelector("[data-header]");
    const footer = document.querySelector("[data-footer]");
    const mobile = document.querySelector("[data-mobile-nav]");
    if (top) mountTopbar(top);
    if (header) mountHeader(header, page);
    if (footer) mountFooter(footer);
    if (mobile) mountMobile(mobile);

    const openBtn = document.querySelector("[data-nav-open]");

    function setChromeHeight() {
      const topbar = document.querySelector(".topbar");
      const siteHeader = document.querySelector(".site-header");
      const topVisible = topbar && getComputedStyle(topbar).display !== "none";
      const topH = topVisible ? topbar.offsetHeight : 0;
      const headH = siteHeader ? siteHeader.offsetHeight : 0;
      document.documentElement.style.setProperty("--site-chrome-h", (topH + headH) + "px");
      document.documentElement.style.setProperty("--header-h", headH + "px");
      if (mobile) mobile.style.top = headH + "px";
    }

    function openNav() {
      if (!mobile) return;
      mobile.classList.add("is-open");
      document.body.classList.add("nav-open");
      openBtn && openBtn.setAttribute("aria-expanded", "true");
      if (openBtn) {
        openBtn.setAttribute("aria-label", "Close menu");
        openBtn.innerHTML = icon.close;
      }
      setChromeHeight();
    }
    function closeNav() {
      if (!mobile) return;
      mobile.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      openBtn && openBtn.setAttribute("aria-expanded", "false");
      if (openBtn) {
        openBtn.setAttribute("aria-label", "Open menu");
        openBtn.innerHTML = icon.menu;
      }
      setChromeHeight();
    }

    openBtn && openBtn.setAttribute("aria-expanded", "false");
    openBtn && openBtn.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
    mobile && mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeNav();
        closeOrderMenu();
      }
    });

    const orderDropdown = document.querySelector(".nav-dropdown--cta");
    const orderToggle = document.querySelector("[data-order-toggle]");
    function closeOrderMenu() {
      if (!orderDropdown) return;
      orderDropdown.classList.remove("is-open");
      orderToggle && orderToggle.setAttribute("aria-expanded", "false");
    }
    function toggleOrderMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!orderDropdown) return;
      const willOpen = !orderDropdown.classList.contains("is-open");
      orderDropdown.classList.toggle("is-open", willOpen);
      orderToggle && orderToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    }
    orderToggle && orderToggle.addEventListener("click", toggleOrderMenu);
    document.addEventListener("click", (e) => {
      if (orderDropdown && !orderDropdown.contains(e.target)) closeOrderMenu();
    });

    const siteHeader = document.querySelector(".site-header");
    const onScroll = () => siteHeader && siteHeader.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setChromeHeight, { passive: true });
    onScroll();
    setChromeHeight();
    requestAnimationFrame(setChromeHeight);
  });
})();
