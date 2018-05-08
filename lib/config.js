var config = {};

config.welcome = {
  timeout: 3000,
  get version () {return app.storage.read("version")},
  set version (val) {app.storage.write("version", val)},
  page: "https://github.com/triceratops1/ua-change/"
};

config.badge = {
  set icon (val) {app.storage.write("badge-icon", val)},
  get icon () {return app.storage.read("badge-icon") || ''}
};

var defaultUAObj = {
  bot: "Googlebot/2.1 (+http://www.googlebot.com/bot.html)",
  ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/48.0.2526.70 Mobile/13C71 Safari/601.1.46",
  android: "Mozilla/5.0 (Linux; U; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.30",
  windowsp: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
  tizen: "Mozilla/5.0 (Linux; U; Tizen 2.0; en-us) AppleWebKit/537.1 (KHTML, like Gecko) Mobile TizenBrowser/2.1",
  symbian: "Nokia5250/10.0.011 (SymbianOS/9.4; U; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Safari/525 3gpp-gba",
  firefoxos: "Mozilla/5.0 (Android 4.4; Mobile; rv:18.0) Gecko/18.0 Firefox/18.0",
  chrome: {
    windowsd: "Mozilla/5.0 (Windows NT 10.0; Win64; es-au; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.30 Safari/537.36",
    linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3423.2 Safari/537.36",
    chromeOS: "Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.26 Safari/537.36",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; FreeBSD amd64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36",
    netbsd: "Mozilla/5.0 (X11; NetBSD x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
    openbsd: "Mozilla/5.0 (X11; OpenBSD amd64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3424.1 Safari/537.36",
  },
  opera: {
    windowsd: "Mozilla/5.0 (Windows NT 10.0; es-es; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.991",
    mac: "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52",
    linux: "Opera/9.80 (X11; Linux x_64; Debian/7) Presto/2.12.388 Version/12.16",
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; U; FreeBSD i386; zh-tw; rv:31.0) Gecko/20100101 Firefox/31.0 Opera/13.0",
    netbsd: "Mozilla/5.0 (X11; U; NetBSD amd64; zh-tw; rv:31.0) Gecko/20100101 Firefox/31.0 Opera/13.0",
    openbsd: "Mozilla/5.0 (X11; U; OpenBSD i686; zh-tw; rv:31.0) Gecko/20100101 Firefox/31.0 Opera/13.0",
  },  
  firefox: {
    windowsd: "Mozilla/5.0 (Windows NT 6.3; rv:47.0) Gecko/20100101 Firefox/47.00",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:42.0) Gecko/20100101 Firefox/42.0",
    linux: "Mozilla/5.0 (X11; Linux i586; es-es; rv:57.0) Gecko/20100101 Firefox/57.0",
    chromeOS: "Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Gecko/20100101 Firefox/59.0",
    ibm: "Mozilla/5.0 (OS/2; U; Warp 4.5; en-US; rv:1.7.12) Gecko/20050922 Firefox/1.0.7",
    freebsd: "Mozilla/5.0 (X11; FreeBSD amd64; rv:61.0) Gecko/20100101 Firefox/61.0",
    netbsd: "Mozilla/5.0 (X11; NetBSD i586; rv:55.0) Gecko/20100101 Firefox/55.0",
    openbsd: "Mozilla/5.0 (X11; OpenBSD amd64; rv:51.0) Gecko/20100101 Firefox/51.0"
  },  
  safari: {
    windowsd: "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
    linux: "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2",
    chromeOS: "",
    ibm: "",
    freebsd: "",
    openbsd: "",
    netbsd: ""
  },
  explorer: {
    windowsd: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
    mac: "",
    linux: "Mozilla/5.0 (X11; Linux; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Midori/0.4",
    chromeOS: "",
    ibm: "",
    freebsd: "",
    openbsd: "",
    netbsd: ""
  },
  midori: {
    windowsd: "Midori/0.2 (Windows; U; Windows NT 6.1; en-US) WebKit/531.2+",
    mac: "",
    linux: "Mozilla/5.0 (X11; U; Linux i686; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori/1.19",
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; U; FreeBSD amd64; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori/0.4",
    openbsd: "Mozilla/5.0 (X11; U; OpenBSD i586; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori/0.5",
    netbsd: "Mozilla/5.0 (X11; U; NetBSD amd64; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori/0.3"
  },
  rekonq: {
    windowsd: "",
    mac: "",
    linux: "Mozilla/5.0 (X11; U; Linux i686; en-GB) AppleWebKit/533.3 (KHTML, like Gecko) rekonq Safari/533.3",
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; U; FreeBSD amd64; en-GB) AppleWebKit/533.3 (KHTML, like Gecko) rekonq Safari/533.3",
    openbsd: "Mozilla/5.0 (X11; U; OpenBSD amd64; en-GB) AppleWebKit/533.3 (KHTML, like Gecko) rekonq Safari/533.3",
    netbsd: "Mozilla/5.0 (X11; U; Linux i686; en-GB) AppleWebKit/533.3 (KHTML, like Gecko) rekonq Safari/533.3"
  },
  palemoon: {
    windowsd: "",
    mac: "",
    linux: "Mozilla/5.0 (X11; Linux i686; fr-fr :rv:45.9) Gecko/20100101 Goanna/3.2 Firefox/45.9 PaleMoon/27.3.0",
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; U; FreeBSD i686; fr-fr; rv:25.6) Gecko/20150723 Firefox/31.9 PaleMoon/25.6.03",
    openbsd: "Mozilla/5.0 (X11; U; OpenBSD amd64; en-GB; Gecko/20130308 Firefox/33.0 (PaleMoon/25.1)",
    netbsd: "Mozilla/5.0 (X11; U; NetBSD i686; en-GB; Gecko/20130308 Firefox/33.0 (PaleMoon/25.1)"
  },
  seamonkey: {
    windowsd: "Mozilla/5.0 (Windows NT 5.2; rv:7.0a1; ru) Gecko/20110622 SeaMonkey/2.4a1",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6.8; U; en; rv:7.0a1) Gecko/20110622 SeaMonkey/2.4",
    linux: "Mozilla/5.0 (X11; U; Linux i686; fr-fr; rv:25.6) Gecko/20150723 FGecko/20110622 SeaMonkey/2.4a1",     
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (X11; U; FreeBSD i686; fr-fr; rv:25.6) Gecko/20150723 FGecko/20110622 SeaMonkey/2.4a1",
    openbsd: "Mozilla/5.0 (X11; U; OpenBSD amd64; es_VE; rv:25.6) Gecko/20150723 FGecko/20110622 SeaMonkey/2.4a1",
    netbsd: "Mozilla/5.0 (X11; U; NetBSD i386; en-GB; rv:25.6) Gecko/20150723 FGecko/20110622 SeaMonkey/2.4a1"
  },
  tor: {
    windowsd: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0",
    mac: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0",
    linux: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0",     
    chromeOS: "",
    ibm: "",
    freebsd: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0",
    openbsd: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0",
    netbsd: "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0"
  },
  edge: {
    windowsd: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
    mac: "",
    linux: "",
    chromeOS: "",
    ibm: "",
    freebsd: "",
    openbsd: "",
    netbsd: ""
  }
};
  
config.useragent = {
  get key () {
    return JSON.parse(app.storage.read("user-agent-key") || '["", "", "default"]');
  },
  set key (val) {
    app.storage.write("user-agent-key", JSON.stringify(val)); 
  },
  get string () {
    return app.storage.read("user-agent-string") || '';
  },
  set string (val) {
    app.storage.write("user-agent-string", val); 
  },
  get text () {
    return app.storage.read("user-agent-text") || 'User-Agent: Default';
  },
  set text (val) {
    app.storage.write("user-agent-text", val); 
  },
  get url () {
    return app.storage.read("user-agent-url") || 'all_urls';
  },
  set url (val) {
    app.storage.write("user-agent-url", val); 
  },
  get obj () {
    if (app.storage.read("user-agent-object")) {
      return JSON.parse(app.storage.read("user-agent-object"));
    }
    else return defaultUAObj;
  },
  set obj (val) {
    app.storage.write("user-agent-object", JSON.stringify(val));
  }
};
