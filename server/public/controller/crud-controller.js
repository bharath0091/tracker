var crudControllerModule = angular.module('crudController', []);
crudControllerModule.controller('CRUDController', function($scope, $http) {
    function refresh() {
        //TODO : project shouldnt be hardcoded, it should be made generic
        $http.get("/crud/rest/list/" + 'project').success(function (response) {
                $scope.documents=response;
                console.log("received success response for GET request")
            }
        );
    }

    refresh();

    $scope.addDocument = function(collectionName){
        console.log("collectionName" + collectionName);
        //console.log($scope.test)

        var successCallback = function (response){
            console.log("received success response for POST request, response :" + JSON.stringify(response));
            $scope.isAddDocumentSuccessful = true;
            $scope.isResponseReceivedFromServer = true;
            $scope.status = response.data;
        }
        var errorCallback = function (response) {
            console.log("received error response for POST request, response :" + JSON.stringify(response));
            $scope.isResponseReceivedFromServer = true;
            if(response.status == 409) {
                $scope.status = response.data;
            } else {
                //
                $scope.status = {"message" : "Error : " + response.status + " " + response.statusText};
            }
            }

    $http.post("/crud/rest/" + collectionName, $scope.document).then(successCallback, errorCallback);




    }

    $scope.deleteProject = function(id){
        console.log("id to delete" + id);
        console.log("$scope.collection " + $scope.collection)
        $http.delete("/crud/rest/" + $scope.collection + "/" +id).success(function (response){
            console.log("received success response for DELETE request")
        refresh();
        });
    }
});

