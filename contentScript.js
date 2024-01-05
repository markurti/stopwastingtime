// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "blockSite") {
    blockSite();
  }
});

function blockSite() {
  document.body.innerHTML = `<h1>Website Blocked</h1><p>Access to YouTube and Twitch is blocked outside of 9 PM to 11 PM.</p>`;
}
