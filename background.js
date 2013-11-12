/**
 * Created by wndfly on 13-10-31.
 */

var options_basic = {
    type: "basic",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "48.png"
};

var options_list = {
    type: "list",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "48.png",
    items: [
        { title: "Item1", message: "This is item 1."},
        { title: "Item2", message: "This is item 2."},
    ],
    buttons: [
        { title: "button1", iconUrl: "16.png"},
        { title: "button2", iconUrl: "16.png"}
    ]
};

var options_image = {
    type: "image",
    title: "图片显示消息",
    message: "当前图片",
    iconUrl: "48.png",
    imageUrl: "128.png"
};

var options_progress = {
    type: "progress",
    title: "进度条消息",
    message: "当前进度50%",
    iconUrl: "48.png",
    progress: 50
};

chrome.notifications.create("", options_basic, function() {});