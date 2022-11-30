/**
 * Helper functions for setting up various parts of pages.
 */

/**
 * Sets up nav links with all pages. To be used on any page that will have navigation
 */
export function setupNav() {
  // Our content area
  const divMain = document.getElementById("content");

  // Append a nav to the content
  const navMain = document.createElement("nav");
  navMain.id = "navMain";
  divMain.appendChild(navMain);

  // Create the ul for the links
  const navLinks = document.createElement("ul");
  navLinks.id = "navLinks";
  navMain.appendChild(navLinks);

  // Append home link
  appendLink(navLinks, "/", () => "Home");

  // Append About Me link
  appendLink(navLinks, "/about", () => "About");
}

/**
 * Creates a p element and appends to main content area with given text
 * @param {String} text The text to display
 */
export function setupIntroText(text) {
  const divMain = document.getElementById("content");
  const pElem = document.createElement("p");
  pElem.innerHTML = text;
  divMain.appendChild(pElem);
}

/**
 * Appends an a element to the given list. The reference and what to show as clickable are params
 * @param {HTMLElement} list The list we want to append to
 * @param {HTMLElement} ref Where this link will go to
 * @param {Function} display The function to determine what to display
 */
function appendLink(list, ref, display) {
  const liElem = document.createElement("li");
  const linkElem = document.createElement("a");
  linkElem.href = ref;
  linkElem.innerText = display();
  liElem.appendChild(linkElem);
  list.appendChild(liElem);
}
