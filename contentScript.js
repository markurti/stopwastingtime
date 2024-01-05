// contentScript.js
chrome.runtime.sendMessage({ action: "checkTimeAndOpenLink", link: window.location.href });
