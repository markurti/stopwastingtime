// background.js
let isTimeValid;

setInterval(() => {
  isTimeValid = checkTimeValidity();
}, 60000); // Check every minute

function checkTimeValidity() {
  const currentHour = new Date().getHours();
  return currentHour >= 21 && currentHour < 23; // Between 9 PM and 11 PM
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: "checkTimeAndAllowSite", tabId: tabId });
    }, 1000); // Delay for 1 second
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkTimeAndAllowSite") {
    checkTimeAndAllowSite(request.tabId);
  }
});

function checkTimeAndAllowSite(tabId) {
  if (!isTimeValid) {
    chrome.tabs.remove(tabId);
  }
}
