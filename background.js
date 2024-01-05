// background.js
let isTimeValid;

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.action === "checkTimeAndOpenLink") {
      checkTimeAndOpenLink(msg.link, port.sender.tab.id);
    }
  });
});

function checkTimeAndOpenLink(link, tabId) {
  if (isTimeValid) {
    chrome.runtime.sendMessage({ action: "openLinkInBackground", link: link });
  } else {
    chrome.tabs.sendMessage(tabId, { action: "showAlert", message: "Sorry, it's not the designated time to open YouTube and Twitch links." });
  }
}

function openLinkInBackground(link) {
  chrome.tabs.create({ url: link }, function (tab) {
    // Tab created
  });
}

// Set isTimeValid based on your logic (e.g., check the time)
isTimeValid = true;  // Replace with your logic to determine if the time is valid
