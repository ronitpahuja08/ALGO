(function (root) {
  'use strict';
  function isValidRectangle(rectangle) {
    return Boolean(rectangle) &&
      Number.isFinite(rectangle.x) && Number.isFinite(rectangle.y) &&
      Number.isFinite(rectangle.width) && Number.isFinite(rectangle.height) &&
      rectangle.width > 0 && rectangle.height > 0;
  }
  function rectangleEdges(rectangle) {
    if (!isValidRectangle(rectangle)) return null;
    return {
      left: rectangle.x - rectangle.width / 2,
      right: rectangle.x + rectangle.width / 2,
      top: rectangle.y - rectangle.height / 2,
      bottom: rectangle.y + rectangle.height / 2
    };
  }
  function rectanglesOverlap(a, b) {
    const first = rectangleEdges(a);
    const second = rectangleEdges(b);
    return Boolean(first && second && first.left < second.right &&
      first.right > second.left && first.top < second.bottom &&
      first.bottom > second.top);
  }
  function overlapArea(a, b) {
    if (!rectanglesOverlap(a, b)) return 0;
    const overlapWidth = (a.width + b.width) / 2 - Math.abs(a.x - b.x);
    const overlapHeight = (a.height + b.height) / 2 - Math.abs(a.y - b.y);
    return Math.max(0, overlapWidth) * Math.max(0, overlapHeight);
  }
  root.overlapArea = overlapArea;
  root.rectanglesOverlap = rectanglesOverlap;
  root.isValidRectangle = isValidRectangle;
  root.rectangleEdges = rectangleEdges;
  if (typeof module !== 'undefined') module.exports = { isValidRectangle, rectangleEdges, rectanglesOverlap, overlapArea };
})(typeof globalThis !== 'undefined' ? globalThis : this);
