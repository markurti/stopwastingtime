// contentScript.js
const port = chrome.runtime.connect({ name: "content-script" });

port.postMessage({
  action: "checkTimeAndOpenLink",
  link: window.location.href,
});
