// background.js
let isTimeValid;

setInterval(() => {
  isTimeValid = checkTimeValidity();
}, 60000); // Check every minute

function checkTimeValidity() {
  const currentHour = new Date().getHours();
  return currentHour >= 21 && currentHour < 23; // Between 9 PM and 11 PM
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkTimeAndBlockSite") {
    checkTimeAndBlockSite();
  }
});

function checkTimeAndBlockSite() {
  if (!isTimeValid) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com' }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.twitch.tv' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  } else {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      // Do nothing, sites are not blocked during valid hours
    });
  }
}

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (!isTimeValid) {
    chrome.tabs.sendMessage(details.tabId, { action: "blockSite" });
  }
});
