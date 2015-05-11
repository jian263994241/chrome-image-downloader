var options = {};
//图片最小分辨率

options.picWidth = 100 ;
options.picHeight = 100 ;

chrome.storage.sync.get(options, function (items) {
    console.log(items);
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

});

var previewPage;

chrome.browserAction.onClicked.addListener(function (tab) {

    if (/chrome-extension:/.test(tab.url)) return;


    chrome.tabs.sendMessage(tab.id, {'type': 'active'}, function (response) {

        if (response  && response.imgs.length > 0) {

            if (previewPage) {
                //预览页面已经存在
                chrome.tabs.sendMessage(previewPage, _.extend(response, {srcTabId: tab.id}));
            } else {
                //预览页不存在，打开预览页
                chrome.tabs.create({url: './gallery.html', active: true}, function (previewTab) {
                    chrome.tabs.sendMessage(previewTab.id, _.extend(response, {srcTabId: tab.id}));
                    previewPage = previewTab.id
                });
            }

        }

    });

});

chrome.tabs.onRemoved.addListener(function (id) {
    if (previewPage == id) {
        previewPage = null;
    }
});
