/**
 * Created by wndfly on 13-11-1.
 */

$(document).ready(function() {
    setTimeout(auto_refresh_page, 1000 * 60 * 2);
});

function auto_refresh_page() {
    window.location.reload();
}

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
