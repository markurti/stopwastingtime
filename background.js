// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkTimeAndOpenLink") {
    checkTimeAndOpenLink(request.link, sender.tab.id);
  }
});

function checkTimeAndOpenLink(link, tabId) {
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    if (backgroundPage.is_valid_time()) {
      chrome.runtime.sendMessage({ action: "openLinkInBackground", link: link });
    } else {
      chrome.tabs.sendMessage(tabId, { action: "showAlert", message: "Sorry, it's not the designated time to open YouTube and Twitch links." });
    }
  });
}

function openLinkInBackground(link) {
  chrome.tabs.create({ url: link }, function (tab) {
    // Tab created
  });
}
