var previewPage;

chrome.browserAction.onClicked.addListener(function (tab) {

    if (/chrome-extension:/.test(tab.url)) return;


    chrome.tabs.sendMessage(tab.id, {'type': 'active'}, function (response) {

        if (response) {
            if (previewPage) {
                chrome.tabs.sendMessage(previewPage, _.extend(response, {srcTabId: tab.id}));
            } else {
                chrome.tabs.create({url: './preview.html', active: true}, function (previewTab) {
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
