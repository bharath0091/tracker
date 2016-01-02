var directivesModule = angular.module('directives', []);

directivesModule.directive('actionRow', function($compile){
    return{
       // restrict: 'A',
        link: function($scope , element){
            element.bind("click", function(e){
                console.log($scope);
                console.log($scope.action);
                $scope.action = {};
                $scope.action.fields = [];
                var childNode = $compile('<input ng-model="action.fields[0].name" type="text">  <select ng-model="action.fields[0].type"> <option value="text">text</option><option value="date">date</option></select> <br>')($scope);
                element.parent().append(childNode);
            });
        }
    }
});