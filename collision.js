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
  function intersectionRectangle(a, b) {
    const first = rectangleEdges(a);
    const second = rectangleEdges(b);
    if (!first || !second) return null;
    const left = Math.max(first.left, second.left);
    const right = Math.min(first.right, second.right);
    const top = Math.max(first.top, second.top);
    const bottom = Math.min(first.bottom, second.bottom);
    if (left >= right || top >= bottom) return null;
    return {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
      width: right - left,
      height: bottom - top
    };
  }
  function overlapArea(a, b) {
    const overlap = intersectionRectangle(a, b);
    return overlap ? overlap.width * overlap.height : 0;
  }
  root.overlapArea = overlapArea;
  root.rectanglesOverlap = rectanglesOverlap;
  root.isValidRectangle = isValidRectangle;
  root.rectangleEdges = rectangleEdges;
  root.intersectionRectangle = intersectionRectangle;
  if (typeof module !== 'undefined') module.exports = { isValidRectangle, rectangleEdges, rectanglesOverlap, intersectionRectangle, overlapArea };
})(typeof globalThis !== 'undefined' ? globalThis : this);
