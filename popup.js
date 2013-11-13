$(document).ready(function() {

    $(".start").click(function() {
	sendStatusMessage("start");
	sendStorePositionMessage("store");
	/*chrome.runtime.sendMessage({updated: true});*/

	
	//chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    
	    /*chrome.tabs.sendMessage(tabs[0].id, {status: "start"}, function(response) {

		if (response.status) {
		    console.log("start position updated");
		}
		
		return true;
	    });*/
	    
	//});
	
	window.close();

	//chrome.tabs.executeScript(null, {code:"alert('sdf');"});
	//window.close();

    });

    $(".stop").click(function() {
	sendStatusMessage("stop");
	sendStorePositionMessage("clear");
	/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	    chrome.tabs.sendMessage(tabs[0].id, {status: "stop"}, function(response) {

		if (response.status) {
		    console.log("stop position updated");
		}
		
		return true;
	    });

	});*/
	
	window.close();

    });

});

function sendStatusMessage(strStatus) {
    
    if (strStatus) {
	/*chrome.runtime.sendMessage({updated: true});*/
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    
	    /*chrome.tabs.sendMessage(tabs[0].id, {status: "start"}, function(response) {

	      if (response.status) {
	      console.log("start position updated");
	      }
	      
	      return true;
	      });*/
	    
	    var port = chrome.tabs.connect(tabs[0].id, {name: "statusMessage"});
	    port.postMessage({status: strStatus});
	    port.onMessage.addListener(function(msg) {
		if (msg.response == "start success") {
		    console.log("start position updated.");
		} else if (msg.response == "stop success") {
		    console.log("stop position updated.");
		}
	    });

	});
	
	//window.close();

	//chrome.tabs.executeScript(null, {code:"alert('sdf');"});
	//window.close();
    }
}

function sendStorePositionMessage(strStatus) {
    
    if (strStatus) {
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    	    
	    var port = chrome.tabs.connect(tabs[0].id, {name: "storePositionMessage"});
	    port.postMessage({status: strStatus});
	    port.onMessage.addListener(function(msg) {
		if (msg.response == "store success") {
		    console.log("store current page positions.");
		} else if (msg.response == "clear success") {
		    console.log("clear all store positions.");
		}
	    });

	});
	
	//window.close();
    }
}
