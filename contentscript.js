/**
 * Created by wndfly on 13-11-1.
 */

$(document).ready(function() {
    if (sessionStorage.getItem("status")) {
	setTimeout(auto_refresh_page, 100 * 60 * 2);
    } 
});

function auto_refresh_page() {
    window.location.reload();
}

/*
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.status == "start") {

	sessionStorage.setItem("status", true);
	sendResponse({status: true});     

    } else {

	sendResponse({status: false});     

    }

    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.status == "stop") {
	
	sessionStorage.clear("status");
	sendResponse({status: true});  
	
    } else {

	sendResponse({status: false});     
	
    }
    
    return true;
});
