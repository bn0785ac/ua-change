var app = {};

app.timer = window;
app.support = true;
app.loadReason = '';

app.version = function () {
  return chrome[chrome.runtime && chrome.runtime.getManifest ? "runtime" : "extension"].getManifest().version;
};

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") app.loadReason = "install";
});

chrome.runtime.onStartup.addListener(function () {app.loadReason = "startup"});

app.storage = (function () {
  var objs = {};
  chrome.storage.local.get(null, function (o) {
    objs = o;
    document.getElementById("common").src = "../common.js";
  });
  /*  */
  return {
    read: function (id) {return objs[id]},
    write: function (id, data) {
      data = data + '';
      objs[id] = data;
      var tmp = {};
      tmp[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.popup = {
  send: function (id, data) {
    chrome.runtime.sendMessage({path: 'background-to-popup', method: id, data: data});
  },
  receive: function (id, callback) {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.path == 'popup-to-background') {
        if (request.method == id) callback(request.data);
      }
    });
  }
};

app.tab = {
  open: function (url) {
    chrome.tabs.create({url: url, active: true});
  }
};

app.button = {
  badgeIcon: function (val) {
    if (val) chrome.browserAction.setIcon({path:"../../data/popup/icons/16/" + val + ".png"});
    else chrome.browserAction.setIcon({path:"../../data/icons/16.png"});
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.path === 'page-to-background') {
    if (request.method === "storageData") {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.id === sender.tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              path: 'background-to-page',
              method: "storageData",
              data: {
                top: sender.tab.url,
                url: config.useragent.url,
                useragent: config.useragent.string
              }
            }, function () {});
          }
        });
      });
    }
  }
});

app.onBeforeSendHeaders = function (callback) {
  var top = {};
  var onBeforeSendHeaders = function (details) {
    var url = details.url;
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0 || url.indexOf('ftp://') === 0) {
      var id = details.tabId + '|' + details.frameId;
      if (details.type === 'main_frame' || details.type === 'sub_frame') top[id] = url;
      return callback(top[id], details.requestHeaders);
    }
  };
  /*  */
  chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {urls : ["http://*/*", "https://*/*"]}, ["blocking", "requestHeaders"]);
};