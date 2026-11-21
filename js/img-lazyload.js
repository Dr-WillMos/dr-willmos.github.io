/* global Fluid, CONFIG */

(function(window, document) {
  for (const each of document.querySelectorAll('img[data-lazyload]')) {
    Fluid.utils.waitElementVisible(each, function() {
      each.removeAttribute('srcset');
      each.removeAttribute('data-lazyload');
    }, CONFIG.lazyload.offset_factor);
  }
})(window, document);
