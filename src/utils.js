
/** 
 * Returns best zoom level for current window width
*/
export function getZoomForWidth() {
  let width = window.innerWidth || document.documentElement.clientWidth
    || document.body.clientWidth;
  if (width < 768) {
    return 5;
  }
  return 7;
}
