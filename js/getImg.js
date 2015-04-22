var _imgs = $('img');
var resArray;
var _img,_str;
//'[A-Za-z0-9_@]+\.(png|jpg|gif|jpeg)'
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    switch (msg.type) {
        case 'active':
            resArray = [];
            _imgs.each(function (n) {
                _str = this.src.split('/');
                _img = {};
                _img.width = this.width;
                _img.height = this.height;
                _img.src = this.src;
                _img.name = _str[_str.length-1];
                //_img.parentA = $(this).parent();
                resArray.push(_img);
            });
            sendResponse({title: document.title, imgs: resArray});
            break;
        case 'template':
            sendResponse(_.template(msg.tpl[0])({imgs:msg.tpl[1]}));
            break;

    }
    ;

});

