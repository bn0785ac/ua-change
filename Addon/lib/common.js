app.timer.setTimeout(function () {
  var version = config.welcome.version;
  if (app.version() !== version) {
    if (app.loadReason === "install" || app.loadReason === "startup") {
      if (app.support) {
        app.tab.open(config.welcome.page + "?v=" + app.version() + (version ? "&p=" + version + "&type=upgrade" : "&type=install"));
      }
      config.welcome.version = app.version();
    }
  }
}, config.welcome.timeout);

app.button.badgeIcon(config.badge.icon);

var popupInit = function () {
  app.popup.send("init", {
    key: config.useragent.key,
    url: config.useragent.url,
    text: config.useragent.text,
    string: config.useragent.string
  });
};

app.popup.receive("load", popupInit);
app.popup.receive("user-agent-url", function (url) {config.useragent.url = url});
app.popup.receive("status-td-text", function (txt) {config.useragent.text = txt});
app.popup.receive("faq", function (url) {app.tab.open(config.welcome.page + "#faq")});
app.popup.receive("bug", function (url) {app.tab.open(config.welcome.page + "#bug-report")});

app.popup.receive("update-user-agent-string", function (o) {
  config.useragent.string = o.UA;
  var obj = config.useragent.obj;
  if (o.key.length == 1) obj[o.key[0]] = o.UA;
  if (o.key.length == 2) obj[o.key[0]][o.key[1]] = o.UA;
  config.useragent.obj = obj;
  popupInit();
});

app.popup.receive("user-agent-id", function (obj) {  
  var arr = obj.id;
  config.useragent.key = arr;
  config.useragent.string = '';
  config.useragent.url = obj.url;
  /*  */
  var UA = config.useragent.obj;
  if (arr.length == 1) config.useragent.string = UA[arr[0]];
  if (arr.length == 2) config.useragent.string = UA[arr[0]][arr[1]];
  if (config.useragent.string) config.badge.icon = arr[0];
  else config.badge.icon = '';
  /*  */
  app.button.badgeIcon(config.badge.icon);
  popupInit();
});

app.onBeforeSendHeaders(function (top, headers) {
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
  if (config.useragent.string) {
    var urls = config.useragent.url.replace(/\s+/g, '').split(",");
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].name.toLowerCase() === 'user-agent') {
        if (action(top, urls)) {
          headers[i].value = config.useragent.string;
        }
      }
    }
  }
  return {requestHeaders: headers};
});