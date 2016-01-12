
var app = angular.module('trackerApp', ['ngRoute', 'actionController', 'actionViewController', 'directives']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/actions', {
            templateUrl: 'partials/action-list.html',
            controller: 'ActionController'
        }).
        when('/action/new', {
            templateUrl: 'partials/action-new.html',
            controller: 'ActionController'
        }).
        when('/action/view/:viewActionId', {
            templateUrl: 'partials/action-view.html',
            controller: 'ActionViewController'
        }).
        when('/action/leave', {
            templateUrl: 'partials/action-detail.html',
            controller: 'ActionController'
        }).
        otherwise({
            redirectTo: '/actions'
        });
    }]);

//app.controller('ActionListController', function ($scope, $http) {
//    function refresh() {
//        $http.get("/action/rest/list").success(function (response) {
//                $scope.actions = response;
//                console.log("received success response for GET request")
//            }
//        );
//    }
//
//    refresh();
//
//    $scope.addAction = function () {
//        console.log($scope.action);
//        //console.log($scope.test)
//        $http.post("/action/rest", $scope.action).success(function (response) {
//            console.log("received success response for POST request");
//            refresh();
//        });
//    }
//
//    $scope.deleteAction = function (id) {
//        console.log("id to delete" + id);
//        //console.log($scope.test)
//        $http.delete("/action/rest/" + id).success(function (response) {
//            console.log("received success response for DELETE request")
//            refresh();
//        });
//    }
//});