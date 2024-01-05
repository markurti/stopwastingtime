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
    chrome.runtime.sendMessage({ action: "checkTimeAndBlockSite", tabId: tabId });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkTimeAndBlockSite") {
    checkTimeAndBlockSite(request.tabId);
  }
});

function checkTimeAndBlockSite(tabId) {
  if (!isTimeValid) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: blockSite
    });
  }
}

function blockSite() {
  document.body.innerHTML = `<h1>Website Blocked</h1><p>Access to YouTube and Twitch is blocked outside of 9 PM to 11 PM.</p>`;
}
