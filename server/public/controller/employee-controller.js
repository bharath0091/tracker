//TODO : change controller name and remove app creation

		var app = angular.module('trackerApp', []);
app.controller('myCtrl', function($scope, $http) {


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