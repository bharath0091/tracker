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

employeeControllerModule.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

employeeControllerModule.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })

            .success(function(){
            })

            .error(function(){
            });
    }
}]);

employeeControllerModule.controller('uploadController', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.uploadFile = function(){
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "/employee/export";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
}]);

