/**
 * Helper functions for setting up various parts of pages.
 */

/**
 * Sets up nav links with all pages. To be used on any page that will have navigation
 */
export function setupNav() {
  // Our content area
  const divMain = document.getElementById('content');

  // Append a nav to the content
  const navMain = document.createElement('nav');
  navMain.id = 'navMain';
  divMain.appendChild(navMain);

  // Create the ul for the links
  const navLinks = document.createElement('ul');
  navLinks.id = 'navLinks';
  navMain.appendChild(navLinks);

  // Append home link
  appendLink(navLinks, '/', () => 'Home');

  // Append About Me link
  appendLink(navLinks, '/about', () => 'About');
}

/**
 * Creates a p element and appends to main content area with given text
 * @param {String} text The text to display
 */
export function addParagraph(text) {
  const divMain = document.getElementById('content');
  const pElem = document.createElement('p');
  pElem.innerText = text;
  divMain.appendChild(pElem);
}

/**
 * Appends an <a> element to the given list. The reference and what to show as clickable are params
 * @param {HTMLElement} list The list we want to append to
 * @param {HTMLElement} ref Where this link will go to
 * @param {Function} display The function to determine what to display
 */
function appendLink(list, ref, display) {
  const liElem = document.createElement('li');
  const linkElem = document.createElement('a');
  linkElem.href = ref;
  linkElem.innerText = display();
  liElem.appendChild(linkElem);
  list.appendChild(liElem);
}

/**
 * Adds a table to the content div with given data. Data is in 2D Array form where each outer list is the row,
 * and its value is a list containing all data for the row
 * @param {String} tableId The optional table's id in the HTML, if any at all
 * @param {Array} data The data we wish to enter
 */
export function addTable(data, tableId) {
  /* Example data:
    [
      ['Requests','Endpoints','Params'],
      ['GET','students','']
    ]
   */
  const divMain = document.getElementById('content'),
    tableElem = document.createElement('table');
  tableElem.style.border = '1px solid';

  // If we gave an id, assign it to table
  if (tableId) {
    tableElem.id = tableId;
  }

  // For every row, get values and create <tr>
  // For every list of values, create and append <td> to the <tr>
  // Once done with values, ppend the row to the table and iterate next
  // Finally, append table to main content area
  for (const row of data) {
    const tableRow = document.createElement('tr');
    for (const value of row) {
      const tableData = document.createElement('td');
      tableData.style.border = '1px dotted';
      tableData.style.paddingRight = '40px';
      tableData.innerText = value;
      tableRow.appendChild(tableData);
    }

    tableElem.appendChild(tableRow);
  }
  divMain.appendChild(tableElem);
}
