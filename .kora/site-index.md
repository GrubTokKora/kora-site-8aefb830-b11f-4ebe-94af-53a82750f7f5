# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Casa Villa Restaurant | Authentic Mexican Food in Stamford, CT
purpose: Home page presenting Casa Villa Restaurant's cuisine, menus, hours, catering, and gallery.
sections:
- `#main` "Casa Villa Restaurant" — Hero section with order and menu CTAs: Order Online, View Menus
- `#about` "Dine-in, pickup & delivery" — About summary with stats and history link: Stamford, Our History
- `#menu` "A taste of Mexico" — Menu tabs and ordering actions for regular, lunch, and catering menus: All Day Menu, Lunch Menu, Catering Menu, Order Regular Menu, Order Lunch Online, Order Catering
- `#hours` "Dine-in, pick-up & delivery" — Operating hours, delivery notes, and contact phone: Order Online
- `#catering` "Feed the whole gathering" — Catering packages and event planning links: Fajita Bar, Taco Bar, Burrito Box, Catering Menu, Plan Your Event
- `#gallery` "Plates worth the trip" — Gallery image buttons of dishes

## contact.html → /contact
title: Contact Casa Villa Restaurant | Stamford CT Mexican Food
purpose: Contact information, location, and message form for Casa Villa Restaurant.
sections:
- `#main` "Get in touch" — hero introduction
- "Casa Villa Restaurant" — contact information, map, and links: Order Now, Open in Maps
- `#contact-form` "Send a note" — contact form topics: General, Catering, Order help, Feedback, Send Message

## history.html → /history
title: Our History | Casa Villa Restaurant Stamford CT
purpose: Present the history and background of the restaurant along with location and contact details.
sections:
- `#main` "Our History" — hero banner
- "South of the Rio Grande, right in Stamford" — restaurant history and overview: Order Online, Contact Us
- "Find Casa Villa" — location and contact information card: Casa Villa Restaurant, Dine-in & pickup, Get Directions

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — The restaurant's business details, contact information, pages, menus, and brand colors: Casa Villa Restaurant, Home, History, Contact, Regular Menu, Catering Menu, Grubhub  [content]
- `robots.txt` — 26 bytes — too small to hold content
- `sitemap.xml` — 110 bytes — too small to hold content
- `assets/site.css` — Menu category tiles, background image definitions, and component UI styles for Casa Villa: appetizers, salads, entrees, burritos, soups, quesadillas, tacos, sides, desserts, drinks  [content]
- `js/includes.js` — Site header, footer, topbar, navigation and shared business contact details and links: 866 East Main Street, Stamford, CT 06902  [content]
- `js/main.js` — The restaurant menu, item prices, and site configuration data: Guacamole, Tostadas de Tinga, Tostadas de Camaron, Tostadas de Carnitas, Nachos, Flautas de Pollo, Gorditas de Maiz con Chicharron, Gorditas de Maiz con Tinga, Gorditas de Maiz con Steak, Shrimp Cocktail, Queso Fundido, Ensalada de la Casa, Ensalada Caesar, Ensalada Mexicana, Fajitas — Chicken, Fajitas — Steak, Fajitas — Shrimp, Fajitas — All the Way (Trio), Fajitas Vegetarianas, Camarones Enchipotlados, Chiles Rellenos con Queso, Chiles Rellenos con Pollo y Queso, Pollo en Crema de Chipotle, Chicharrón de Pollo, Enchiladas de Mole Poblano, Shrimp Enchiladas, Salmon Estilo Veracruz, Camarones al Mojo de Ajo, Camarones a la Diabla, Filete de Tilapia al Ajillo, Mariscada en Salsa Verde, Chuletas con Salpicón, Carne Asada al Carbón, Bistec a la Mexicana, Villas NY Steak con Chile Poblano, Pechuga Ranchera, Burrito Vegetariano with Rice & Beans, Burrito de Pollo with Rice & Beans, Burrito de Bistec with Rice & Beans, Burrito de Camarones with Rice & Beans, Sopa de Pollo, Sopa de Mariscos, Quesadilla de Queso, Quesadilla de Steak, Quesadilla de Pollo, Quesadilla de Camarones, Quesadilla Vegetariana, Tacos de Pollo, Tacos de Steak, Tacos de Cecina, Tacos de Carnitas, Tacos de Chicharrón, Tacos de Chorizo, Tacos de Camarón, Tacos al Pastor, 3 Tacos con Arroz y Frijoles, 3 Tacos de Pescado, Maduros, Tostones, Rice and Beans, Side of Guacamole, Sour Cream, 3 oz. Red Salsa, 3 oz. Green Salsa, Chips and Salsa, Beans, Rice, Churros con Dulce de Leche, Pastel de Tres Leches, Flan, Horchata, Tamarindo, Jamaica, Jarritos (Mexican Flavored Soda), Canned Sodas, Topo Chico (Mineral Water), Fruit Milk Shakes, Bottled Mexican Coca Cola, Fajitas Vegetarian  [content]

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
