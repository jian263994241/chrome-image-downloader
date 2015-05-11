angular.module('dlImg', ['ui.bootstrap', 'ui-rangeSlider'])
    .controller('imageList', function ($scope, $rootScope, $timeout) {

        chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
            document.title = msg.title;
            $rootScope.imgs = $rootScope.originList  =  msg.imgs;
            $rootScope.$apply();
        });

        $scope.checked = function ($event) {
            var _this = this;
            $($event.currentTarget).toggleClass(function () {
                var $this = $(this),_thisImg = $this.find('img');
                if ($this.hasClass('active')) {
                    $rootScope.selImg = _.filter($rootScope.selImg, function (item) {
                        return item.src != _thisImg.attr('src');
                    });
                } else {
                    $rootScope.selImg.push(_this.item);
                }
                return 'active';
            });
        };
    })
    .controller('toolbar', function ($scope, $rootScope,$timeout) {


        $rootScope.selImg = [];
        $scope.model = {
            width: 0,
            height: 0
        };
        $scope.imageView = 'grid';
        $scope.$watchCollection('model', _.debounce(function (newValue, oldValue) {
            if(newValue != oldValue){

                $rootScope.imgs = _.filter($rootScope.originList, function (item) {
                    return  item.width >= $scope.model.width && item.height >= $scope.model.height;
                });
                $rootScope.selImg = _.filter($rootScope.selImg, function (item) {
                    return  item.width >= $scope.model.width && item.height >= $scope.model.height;
                });
                $rootScope.$apply();
            }

        }, 300));

        $scope.setAll = function () {
            var _this = this;
            $('.image-list').find('.thumbnail').each(function () {
                var $this = $(this);
                if(!$this.hasClass('active')){
                    $timeout(function () {
                        $this.trigger('click');
                    });
                }
            })
        };
        $scope.setInvert = function () {
            $('.image-list').find('.thumbnail').each(function () {
                var $this = $(this);
                $timeout(function () {
                    $this.trigger('click');
                });
            });
        };
        $scope.openSetting = function () {
            window.open('options.html');
            //location.href = 'options.html';
        };
        $scope.download = function () {
            console.log($rootScope.selImg);
        };

    })
;

$(document).ready(function () {
    angular.bootstrap(document, ['dlImg']);
});