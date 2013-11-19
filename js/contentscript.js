/**
 * Created by wndfly on 13-11-1.
 */

var nTimeout = null;
var objAudio = null;

$(document).ready(function() {
    var position_updated_list = comparePositionList();

    if (position_updated_list && position_updated_list.length) {
	setPositionColor(position_updated_list);
	sendNotificationsMessage(position_updated_list);
    playAudio();
    } else {
	setRefreshPage();
    }
});

function playAudio() {
    if(window.Audio) {
        if(!objAudio) {
            var strUrlAudio = chrome.runtime.getURL("audio/Beep.ogg");
            objAudio = new Audio(strUrlAudio);
            objAudio.loop = true;
        }
        objAudio.play();
    }
}

function autoRefreshPage() {
    window.location.reload();
}

function setRefreshPage() {
    if (sessionStorage.getItem("status")) {
	nTimeout = setTimeout(autoRefreshPage, 1000 * 60 * 2);
    }
}

function getPositionList() {
    var element_list = $("tr.tr0 > td.td1 > a");
    var position_list = new Array();

    for (var i in element_list) {
	if (element_list.hasOwnProperty(i)) {
	    var position = {
		name: element_list[i].text,
		url: element_list[i].href
	    };
	    
	    position_list.push(position);
	}
    }
    
    return position_list;
}

function comparePositionList() {
    var position_new_list = getPositionList();
    var position_old_list = JSON.parse(sessionStorage.getItem("positions"));
    var bStatus = false;
    var position_updated_list = new Array();
    
    if (position_old_list && position_old_list.length) {
	for (var i in position_new_list) {
	    if (position_new_list.hasOwnProperty(i)) {
		var bTest = true;

		for (var j in position_old_list) {
		    if (position_old_list.hasOwnProperty(j)) {
			if (position_old_list[j].url == position_new_list[i].url) {
			    bTest = false;
			    break;
			}
		    }
		}
		
		if (bTest) {
		    position_updated_list.push(position_new_list[i]);
		}
	    }
	}
    }

    return position_updated_list;
}

function setPositionColor(listUpdatedPosition, strColor, strColor2) {
    strColor = strColor ? strColor : "#F8A3A3";
    strColor2 = strColor2 ? strColor2 : "#F6E8E8";
 
    for (var i in listUpdatedPosition) {
	if (listUpdatedPosition.hasOwnProperty(i)) {
	    $("tr.tr0 > td.td1 > a[href='" + listUpdatedPosition[i].url  +  "']").parent().parent().css("background-color", strColor);

	    $("tr.tr0 > td.td1 > a[href='" + listUpdatedPosition[i].url  +  "']").parent().parent().mouseover(function(event) {

		if (event.target.tagName == "TR") {
		    event.target.style.backgroundColor = strColor2;
		} else if (event.target.tagName == "TD") {
		    event.target.parentNode.style.backgroundColor = strColor2;
		} else if (event.target.tagName == "A") {
		    event.target.parentNode.parentNode.style.backgroundColor = strColor2;
		}

	    });

	    $("tr.tr0 > td.td1 > a[href='" + listUpdatedPosition[i].url  +  "']").parent().parent().mouseout(function(event) {

		if (event.target.tagName == "TR") {
		    event.target.style.backgroundColor = strColor;
		} else if (event.target.tagName == "TD") {
		    event.target.parentNode.style.backgroundColor = strColor;
		} else if (event.target.tagName == "A") {
		    event.target.parentNode.parentNode.style.backgroundColor = strColor;
		}

	    });
	}
    }
}

function sendNotificationsMessage(listUpdatedPosition) {
   chrome.runtime.sendMessage({position: "updated"});
}

/*
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
*/

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == "statusMessage") {
	port.onMessage.addListener(function(msg) {
	    if (msg.status == "start") {
		sessionStorage.setItem("status", true);
		setRefreshPage();
		port.postMessage({response: "start success"});
	    } else if (msg.status == "stop") {
		sessionStorage.clear("status");
        autoRefreshPage();
		//clearTimeout(nTimeout);
		port.postMessage({response: "stop success"});
	    }
	});
    } else if (port.name == "storePositionMessage") {
	port.onMessage.addListener(function(msg) {
	    if (msg.status == "store") {
		position_list = getPositionList();
		sessionStorage.setItem("positions", JSON.stringify(position_list));
		port.postMessage({response: "store success"});
	    } else if (msg.status == "clear") {
		sessionStorage.clear("positions");
		port.postMessage({response: "clear success"});
	    }
	});
    }
});

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
