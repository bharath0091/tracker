var employeeActionControllerModule = angular.module('employeeActionController', ['ngRoute']);
employeeActionControllerModule.controller('EmployeeActionController', function($scope, $routeParams, $http) {
        function refresh() {
            var employeeId = $routeParams.employeeId;
            var actionId = $routeParams.actionId;
            console.log("$routeParams.employeeId :" + employeeId);
            console.log("$routeParams.actionId :" + actionId);
            $http.get("/employee-actions/rest/employee-action-by-their-ids/" + employeeId + '/' + actionId).success(function (response) {
                $scope.employeeAction = response;
                    console.log("received success response for GET request " + JSON.stringify(response));
                }
            );
        }

        refresh();

        //$scope.addAction = function () {
        //    console.log($scope.action);
        //    //console.log($scope.test)
        //    $http.post("/action/rest", $scope.action).success(function (response) {
        //        console.log("received success response for POST request");
        //        $scope.isAddActionSuccessful = true;
        //    });
        //}

    });