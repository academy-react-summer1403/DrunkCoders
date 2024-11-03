/**
 * Get current browser viewport height
 */
function _get_window_height() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight ||
    0
  );
}

/**
 * Get current absolute window scroll position
 */
function _get_window_Yscroll() {
  return (
    window.scrollY ||
    document.body.scrollTop ||
    document.documentElement.scrollTop ||
    0
  );
}

/**
 * Get current absolute document height
 */
function _get_doc_height() {
  return Math.max(
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0,
    document.body.clientHeight || 0,
    document.documentElement.clientHeight || 0,
  );
}

/**
 * Get current vertical scroll percentage
 */
function _get_scroll_percentage() {
  return Math.round(
    (_get_window_Yscroll() / (_get_doc_height() - _get_window_height())) * 100,
  );
}

export { _get_scroll_percentage };
