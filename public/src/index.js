/**
 * This contains page setup code for the default/blank endpoint
 */
import { setupNav, addParagraph } from './utils.js';

/**
 * Initialize the page, add links, text, basically the entire display
 */
(function init() {
  setupNav();
  addParagraph(`If you're here, you followed instructions well or already knew what you were doing! For those well versed in this stuff:
  The endpoint to use is student (one table in one database), there is no authentication at the moment, and request specific info can be found in the about page.
  If you are new to this stuff, read the about page further for more info.`);
})();
