/**
 * This contains page setup code for the about endpoint.
 */
import { setupNav, addParagraph, addTable } from './utils.js';

/**
 * Initialize the page, add links, text, basically the entire display
 */
(function init() {
  setupNav();
  addParagraph(`Request info:`);
  addTable([
    ['Requests', 'Endpoints', 'Params', 'Notes'],
    ['GET', 'students', '', ''],
    ['POST', 'students', '', 'Expects request body, id auto increments'],
    ['DELETE', 'students', 'id', ''],
  ]);
  addParagraph(`The above table contains a list of requests you can perform while the server is running (which it is if this page is accessible).
  To start, either use the popular Postman or another way of sending HTTP requests (VS Code has extensions, and you can also use curl, fetch, google for others).
  Then using the endpoint (for example, localhost:PORT/students), do your request and examine the response body for info about the request.`);
})();
