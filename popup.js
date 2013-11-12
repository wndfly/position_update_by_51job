$(document).ready(function() {

    $(".start").click(function() {
	
	/*chrome.runtime.sendMessage({updated: true});*/

	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    
	    chrome.tabs.sendMessage(tabs[0].id, {status: "start"}, function(response) {

		if (response.status) {
		    console.log("start position updated");
		}
		
		return true;
	    });

	});
	
	//window.close();

	//chrome.tabs.executeScript(null, {code:"alert('sdf');"});
	//window.close();

    });

    $(".stop").click(function() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	    chrome.tabs.sendMessage(tabs[0].id, {status: "stop"}, function(response) {

		if (response.status) {
		    console.log("stop position updated");
		}
		
		return true;
	    });

	});
	
	//window.close();

    });

});

