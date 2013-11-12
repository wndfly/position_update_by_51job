$(document).ready(function() {

    $(".start").click(function() {
	
	/*chrome.runtime.sendMessage({greeting: "hello1"}, function(response) {
	    console.log(response.farewell);
	});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello1"}, function(response) {
		console.log(response.farewell);
	    });
	});*/

	chrome.tabs.executeScript(null,
				  {code:"alert('sdf');"});
	window.close();

    });

    $(".stop").click(function() {
	console.log("g");
    });

});

chrome.tabs.executeScript(null,
                                  {code:"alert('sdf');"});
        window.close();

