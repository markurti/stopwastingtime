// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkTimeAndOpenLink") {
    checkTimeAndOpenLink(request.link);
  }
});

function checkTimeAndOpenLink(link) {
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    if (backgroundPage.is_valid_time()) {
      backgroundPage.open_link(link);
    } else {
      alert("Sorry, it's not the designated time to open YouTube and Twitch links.");
    }
  });
}
