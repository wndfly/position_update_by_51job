/**
 * Created by wndfly on 13-10-31.
 */


var options_basic = {
    type: "basic",
    title: "职位更新通知",
    message: "有新的职位更新，请关注51job职位搜索页面中用红色背景标记的页面。",
    iconUrl: "48x48.png"
};

var options_list = {
    type: "list",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "48x48.png",
    items: [
        { title: "Item1", message: "This is item 1."},
        { title: "Item2", message: "This is item 2."},
    ],
    buttons: [
        { title: "button1", iconUrl: "16x16.png"},
        { title: "button2", iconUrl: "16x16.png"}
    ]
};

var options_image = {
    type: "image",
    title: "图片显示消息",
    message: "当前图片",
    iconUrl: "48x48.png",
    imageUrl: "128x128.png"
};

var options_progress = {
    type: "progress",
    title: "进度条消息",
    message: "当前进度50%",
    iconUrl: "48x48.png",
    progress: 50
};

/*
chrome.notifications.create("", options_basic, function() {});
*/

/*
// Called when a message is passed.  We assume that the content script
// wants to show the page action.
function onRequest(request, sender, sendResponse) {
      // Show the page action for the tab that the sender (content script)
      // was on.
      chrome.pageAction.show(sender.tab.id);
    
      // Return nothing to let the connection be cleaned up.
      sendResponse({});
    };

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
*/


// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
      // If the letter 'g' is found in the tab's URL...
      if (tab.url.indexOf("51job.com") > -1) {
	    // ... show the page action.
	    chrome.pageAction.show(tabId);
      }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.position == "updated") {
	chrome.notifications.create("", options_basic, function() {});
    }
    //sendResponse({farewell: "goodbye11111"});
});
