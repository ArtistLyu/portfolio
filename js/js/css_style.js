//如果所有的裝置要一起改變可以這樣用   
if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {   
    $("#css_style").attr("href","ipad.css");   
};  