
/** 
 * Returns best zoom level for current window width
*/
export function getZoomForWidth({ desktop, mobile }) {
  let width = window.innerWidth || document.documentElement.clientWidth
    || document.body.clientWidth;
  if (width < 768) {
    return mobile;
  }
  return desktop;
}
