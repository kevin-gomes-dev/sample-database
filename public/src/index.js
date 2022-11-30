/**
 * Everything related to the home page here
 */
import { setupNav, setupIntroText } from "./utils.js";

/**
 * Our init function, upon page load
 */
(function init() {
  setupNav();
  setupIntroText("Welcome home. Navigate to other pages to see more...");
})();
