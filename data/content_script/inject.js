var action = function (top, urls) {
  if (!top) return true;
  /*  */
  if (urls.indexOf('*') !== -1) return true;
  if (urls.indexOf('all_urls') !== -1) return true;
  /*  */
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    if (url === top) return true;
    else if (top && top.indexOf(url) !== -1) return true;
  }
  /*  */
  return false;
};