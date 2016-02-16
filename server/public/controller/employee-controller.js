var employeeControllerModule = angular.module('employeeController', []);
employeeControllerModule.controller('EmployeeController', function($scope, $http) {
    function refresh() {
        $http.get("/rest/list").success(function (response) {
                $scope.employees=response;
                console.log("received success response for GET request")
            }
        );
    }

    refresh();

    $scope.addEmployee = function(){
        console.log($scope.employee);
        //console.log($scope.test)
    $http.post("/rest", $scope.employee).success(function (response){
        console.log("received success response for POST request");
        $scope.isAddEmployeeSuccessful = true;
     refresh();
    });
    }

    $scope.deleteEmployee = function(id){
        console.log("id to delete" + id);
        //console.log($scope.test)
        $http.delete("/rest/"+id).success(function (response){
            console.log("received success response for DELETE request")
        refresh();
        });
    }
});