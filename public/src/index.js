/**
 * This contains page setup code for the default/blank endpoint
 */
import { setupNav, addParagraph } from './utils.js';

/**
 * Initialize the page, add links, text, basically the entire display
 */
(function init() {
  setupNav();
  addParagraph(`Welcome to a sample database project using MySQL driver node and express for serving and API
  development. See About page for the kinds of requests that are allowed, and play with any of the source code
  to learn how it all works. This project is simply for learning purposes.`);
})();
