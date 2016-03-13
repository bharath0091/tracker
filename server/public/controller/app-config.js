
var app = angular.module('trackerApp', ['ngRoute', 'employeeController', 'actionController', 'actionViewController', 'employeeActionsController', 'employeeActionController', 'defaultersController', 'giveDataController', 'crudController', 'directives']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/employees', {
            templateUrl: 'partials/employee-list.html',
            controller: 'EmployeeController'
        }).
        // TODO why same controller for both list and new, refresh happens for employee-new also; same for action
        when('/employee/new', {
            templateUrl: 'partials/employee-new.html',
            controller: 'EmployeeController'
        }).
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
        when('/employee-actions/employee/:employeeId', {
            templateUrl: 'partials/employee-actions-view.html',
            controller: 'EmployeeActionsController'
        }).
        when('/employee-actions/employee/:employeeId/action/:actionId', {
            templateUrl: 'partials/employee-actions-view.html',
            controller: 'EmployeeActionsController'
        }).
        when('/employee-actions/employee/:employeeId/action/:actionId', {
            templateUrl: 'partials/employee-action-view.html',
            controller: 'EmployeeActionController'
        }).
        when('/defaulters', {
            templateUrl: 'partials/defaulters.html',
            controller: 'DefaultersController'
        }).
        when('/report', {
            templateUrl: 'partials/report.html',
            controller: 'DefaultersController'
        }).
        when('/give-data/:actionId', {
            templateUrl: 'partials/give-data.html',
            controller: 'GiveDataController'
        }).
        when('/projects', {
            templateUrl: 'partials/project-list.html',
            controller: 'CRUDController'
        }).
        when('/project/new', {
            templateUrl: 'partials/project-new.html',
            controller: 'CRUDController'
        }).
        when('/action/leave', {
            //TODO
            templateUrl: 'partials/',
            controller: 'ActionController'
        });
    }]);
