var crudControllerModule = angular.module('crudController', []);

crudControllerModule.factory('dataCache', function($cacheFactory) {
    return $cacheFactory('someCache', {
        capacity: 3 // optional - turns the cache into LRU cache
    });
})

crudControllerModule.controller('CRUDController', function($scope, $http, $routeParams, dataCache) {

    var updateDucumentId = $routeParams.id;
    function refresh(forceLoad) {
        //TODO : project shouldnt be hardcoded, it should be made generic
        var cacheKey = 'project' + 'list';
        if(forceLoad || dataCache.get(cacheKey) == undefined) {
            //TODO : project shouldnt be hardcoded, it should be made generic
            $http.get("/crud/rest/list/" + 'project').success(function (response) {
                    $scope.documents=response;
                    dataCache.put(cacheKey, response);
                    console.log("received success response for GET request")
                }
            );
        } else {
            $scope.documents = dataCache.get(cacheKey);
        }
    }

    if (updateDucumentId == undefined) {
        refresh(true);
    } else {
        loadDocument();
    }

    function loadDocument() {
        //TODO : project shouldnt be hardcoded, it should be made generic
        var cacheKey = 'project' + 'list';
        var documents = dataCache.get(cacheKey);
        for (var index = 0; index < documents.length; index++) {
            var document = documents[index];
            if (document._id == updateDucumentId) {
                $scope.document = document;
                break;
            }
        }
    }


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
            if(response.status == 400) {
                $scope.status = response.data;
            } else {
                //
                $scope.status = {"message" : "Error : " + response.status + " " + response.statusText};
            }
            }

    $http.post("/crud/rest/" + collectionName, $scope.document).then(successCallback, errorCallback);

    }

    $scope.updateDocument = function(collectionName){
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
            if(response.status == 400) {
                $scope.status = response.data;
            } else {
                //
                $scope.status = {"message" : "Error : " + response.status + " " + response.statusText};
            }
        }

        $http.put("/crud/rest/" + collectionName, $scope.document).then(successCallback, errorCallback);

    }

    $scope.deleteProject = function(id){
        console.log("id to delete" + id);
        console.log("$scope.collection " + $scope.collection)
        $http.delete("/crud/rest/" + $scope.collection + "/" +id).success(function (response){
            console.log("received success response for DELETE request")
        refresh(true);
        });
    }
});

