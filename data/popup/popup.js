useragenString = '', useragenKey = [], statusTdText = '', useragentURL = 'all_urls';

window.addEventListener('message', function (e) {
  if (e.data.path === "useragent-switcher-popup-load") {
    background.send("load");
  }
});

background.receive("init", function (obj) {
  function initPopup(obj, txt, flag) {
    statusTdText = txt;
    if (obj.key[0]) {
      var elm1 = document.getElementById(obj.key[0]);
      if (flag && elm1) elm1.setAttribute('type', 'selected');
      else if (elm1) elm1.removeAttribute('type');
    }
    if (obj.key[1]) {
      var elm2 = document.getElementById(obj.key[1]);
      if (flag && elm2) elm2.setAttribute('type', 'selected');
      else if (elm2) elm2.removeAttribute('type');
    }
    useragentURL = obj.url;
    document.getElementById('url').value = obj.url;
    document.getElementById('status-td').textContent = statusTdText;
  }
  if (obj.key[2] && obj.key[2] == 'default') {
    initPopup(obj, 'User-Agent: Default', false);
  }
  else if (obj.string) {
    useragenKey = obj.key;
    useragenString = obj.string;
    initPopup(obj, obj.text, true);
  }
  else initPopup(obj, 'User-Agent: Not Available', false);
});

function handleClick(e) {
  function update(UA) {
    if (UA.length == 2) {
      var title1 = document.getElementById(UA[0]).getAttribute("title");
      var title2 = document.getElementById(UA[1]).getAttribute("title");
      statusTdText = "User-Agent: " + title1 + " on " + title2;
    }
    if (UA.length == 1) {
      var title = document.getElementById(UA[0]).getAttribute("title");
      statusTdText = "User-Agent: " + title;
    }
    else if (UA[3] === 'default') {
      statusTdText = "User-Agent: Default";
    }
    
    document.getElementById('status-td').textContent = statusTdText;
    /*  */
    background.send('status-td-text', statusTdText);
    background.send('user-agent-id', {id: UA, url: useragentURL});
  }
  /*  */
  var UA = [];
  var target = e.target || e.originalTarget;
  function cleanTable(table) {
    var tds = table.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
      tds[i].removeAttribute('type');
    }
  }
  /* popup sections */
  var mobileBrowsers = document.getElementById('mobile-browsers');
  var desktopBrowsers = document.getElementById('desktop-browsers');
  var operatingSystems = document.getElementById('operating-systems');
  /* default user-agent */
  if (target.getAttribute("id") == "default") {
    UA = ['', '', 'default'];
    cleanTable(mobileBrowsers);
    cleanTable(desktopBrowsers);
    cleanTable(operatingSystems);
  }
  /* clean table */
  var currentTable = target.parentNode.parentNode.parentNode;
  cleanTable(currentTable);
  if (currentTable.getAttribute('id') == 'mobile-browsers') {
    cleanTable(desktopBrowsers);
    cleanTable(operatingSystems);
  }
  else {
    cleanTable(mobileBrowsers);
  }
  /* select user-agent */
  var tdID = target.getAttribute('id');
  if (tdID && tdID !== 'default') {
    target.setAttribute('type', 'selected');
  }
  /* manage status */
  var tds = document.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    var table = tds[i].parentNode.parentNode.parentNode;
    if (tds[i].getAttribute('type') == 'selected') {
      UA.push(tds[i].getAttribute('id'));
    }
  }
  if (UA.length == 1) {
    if (currentTable.getAttribute('id') === 'desktop-browsers') {
      UA.push("windowsd"); /* add windows as a default OS */
      document.getElementById("windowsd").setAttribute('type', 'selected');
    }
    if (currentTable.getAttribute('id') === 'operating-systems') {
      UA.unshift("chrome"); /* add chrome as a default browser */
      document.getElementById("chrome").setAttribute('type', 'selected');
    }
  }
  update(UA);
}

/* click listeners */
document.getElementById('mobile-browsers').addEventListener('click', handleClick, false);
document.getElementById('desktop-browsers').addEventListener('click', handleClick, false);
document.getElementById('operating-systems').addEventListener('click', handleClick, false);
document.getElementById('default').addEventListener('click', handleClick, false);

document.getElementById('faq').addEventListener('click', function () {
  background.send('faq');
}, false);

document.getElementById('bug').addEventListener('click', function () {
  background.send('bug');
}, false);

document.getElementById('copy').addEventListener('click', function () {
  var oldUA = useragenString;
  var newUA = window.prompt("Edit this User-Agent string or Copy the string to clipboard (Ctrl C + Enter)", useragenString);
  if (newUA) {
    if (newUA !== oldUA) {
      background.send("update-user-agent-string", {UA: newUA, key: useragenKey});
    }
  }
}, false);

/* change listeners */
document.getElementById('url').addEventListener('change', function (e) {
  var target = e.target || e.originalTarget;
  useragentURL = target.value || 'all_urls';
  background.send('user-agent-url', useragentURL);
  target.value = useragentURL;
}, false);

/* hover listeners */
function updateInformation(e) {
  var target = e.target || e.originalTarget;
  var title = target.getAttribute("title") || statusTdText;
  document.getElementById('status-td').textContent = title;
}

function resetInformation(e) {
  document.getElementById('status-td').textContent = statusTdText;
}

var tds = document.querySelectorAll('td');
for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener("mouseenter", updateInformation, false);
  tds[i].addEventListener("mouseleave", resetInformation, false);
}