/**
 * This contains page setup code for the about endpoint.
 */
import { setupNav, addParagraph, addTable } from './utils.js';

/**
 * Initialize the page, add links, text, basically the entire display
 */
(function init() {
  setupNav();
  addParagraph(`Request info for /students:`);
  addTable([
    ['Request', 'Params', 'Notes'],
    ['GET', '(optional) id', 'Gets all or 1 student(s)'],
    ['POST', '', 'Expects request body, creates a student'],
    ['PUT', 'id', 'Expects request body, Updates student with given id'],
    ['DELETE', '(optional) id', 'Removes all or 1 student(s).'],
  ]);
  addParagraph('Request info for /courses:');
  addTable([
    ['Request', 'Params', 'Notes'],
    ['GET', '(optional) id', 'Gets all or 1 course(s)'],
    ['POST', '', 'Expects request body, creates a course'],
    ['PUT', 'id', 'Expects request body, Updates course with given id'],
    ['DELETE', '(optional) id', 'Removes all or 1 course(s).'],
  ]);
  addParagraph('Request info for /courseManagement:');
  addTable([
    ['Request', 'Params', 'Notes'],
    ['GET', '(optional) id', `Gets all or 1 student's courses`],
    ['POST', 'id', 'Expects request body, adds course to student with given id'],
    ['DELETE', '(optional) id', `Removes all or 1 student's course.`],
  ]);
  addParagraph(`The above tables contain a list of requests you can perform while the server is running (which it is if this page is accessible).
  To start, either use the popular Postman or another way of sending HTTP requests (VS Code has extensions, and you can also use curl, fetch, google for others).
  Then using the endpoint (for example, localhost:PORT/students), do your request and examine the response body for the result of the request.`);
})();
