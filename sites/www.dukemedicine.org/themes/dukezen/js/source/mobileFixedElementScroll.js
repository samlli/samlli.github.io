/*
* Force a repaint on mobile devices because of position
* fixed elements hit states not being repainted.
* This is documented as the iOS scrollto bug.
*/
(function ($, Drupal, window, document, undefined) {
  document.getElementsByTagName("body")[0].addEventListener("touchstart",function(){});
})(jQuery, Drupal, this, this.document);