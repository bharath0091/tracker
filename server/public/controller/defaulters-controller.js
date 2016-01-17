var defaultersControllerModule = angular.module('defaultersController', []);

defaultersControllerModule.controller('DefaultersController', function ($scope, $http) {
    function onLoad() {
        $http.get("/action/rest/list").success(function (response) {
                $scope.actions = response;
                console.log("received success response for GET request")
            }
        );
    }

    onLoad();

    $scope.showDefaulters = function () {
        console.log("selected action _id:" + $scope.selectedActionId);
        $http.get("/defaulters/rest/action-id/" + $scope.selectedActionId).success(function (response) {
                $scope.defaulters = response;
                console.log("received success response for GET request : " + JSON.stringify(response));
            }
        );
    }

    $scope.deleteAction = function (id) {
        console.log("id to delete" + id);
        //console.log($scope.test)
        $http.delete("/action/rest/" + id).success(function (response) {
            console.log("received success response for DELETE request")
            refresh();
        });
    }
});