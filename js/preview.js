

angular.module('dlImg',['ui.bootstrap','ui-rangeSlider'])
    .controller('imageList', function ($scope) {

        chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
            document.title = msg.title;
            $scope.imgs = msg.imgs;
            $scope.$apply();
        })

    })
    .controller('toolbar', function ($scope) {
        $scope.model = {
            width: 100,
            height: 100
        };
        $scope.imageView = 'grid';
        $scope.$watchCollection('model',  _.debounce(function (newValue, oldValue) {
            console.log(newValue);
        }, 300));

    })
;