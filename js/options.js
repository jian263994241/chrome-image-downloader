// Saves options to chrome.storage
function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);

    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}

$(document).ready(function () {

    //chrome.storage.sync.get(options, function (items) {
    //    console.log(items);
    //});
    angular.bootstrap(document, ['mySetting']);
});

angular.module('mySetting',['ui.bootstrap'])
    .controller('options', function ($scope) {
        $scope.alerts = [
            //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];
        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };



    })
;
