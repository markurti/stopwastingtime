// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openLinkInBackground") {
    openLinkInBackground(request.link);
  }
});

function openLinkInBackground(link) {
  chrome.tabs.create({ url: link }, function (tab) {
    // Tab created
  });
}
