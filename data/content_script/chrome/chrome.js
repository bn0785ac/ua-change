var background = {
  send: function (id, data) {
    chrome.runtime.sendMessage({path: 'page-to-background', method: id, data: data});
  },
  receive: function (id, callback) {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.path === 'background-to-page') {
        if (request.method == id) callback(request.data);
      }
    });
  }
};

var script = document.getElementById("useragent-switcher");
if (script) script.parentNode.removeChild(script);

background.receive("storageData", function (data) { 
  var top = data.top;
  var urls = data.url.replace(/\s+/g, '').split(",");
  if (data.useragent) {
    if (action(top, urls)) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.setAttribute("id", "useragent-switcher");
      script.textContent = 'navigator.__defineGetter__("userAgent", function() {return "' + data.useragent + '"});';
      document.documentElement.appendChild(script);
    }
  }
});

background.send("storageData");