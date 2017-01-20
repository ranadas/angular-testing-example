(function () {

  'use strict';

  var myApp = angular.module('myApp', ['ngRoute', 'mgcrea.ngStrap']);

  myApp.constant('VERSION', "0.1");

  myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {templateUrl:'partials/home.html', activetab: 'home'})
    .when('/one', {templateUrl:'partials/one.html', controller:'TestOneController', activetab: 'one'})
    .when('/two', {templateUrl:'partials/two.html', controller:'TestTwoController', activetab: 'tow'})
    .when('/three', {templateUrl:'partials/three.html', controller:'TestThreeController', activetab: 'three'})
    .when('/four', {templateUrl:'partials/four.html', controller:'TestFourController', activetab: 'four'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });

  myApp.controller('TestOneController', function($scope) {
    $scope.greeting = "Hello, World!";
    $scope.newText = undefined;
    $scope.changeGreeting = function() {
      if ($scope.newText !== undefined) {
        $scope.greeting = $scope.newText;
      }
    };
  });

  myApp.controller('TestTwoController', function($scope) {
    $scope.total = 6;
    $scope.newItem = undefined;
    $scope.items = [1, 2, 3];
    $scope.add = function () {
      if(typeof $scope.newItem == 'number') {
        $scope.items.push($scope.newItem);
        $scope.total = 0;
        for(var i = 0; i < $scope.items.length; i++){
          $scope.total += parseInt($scope.items[i]);
        }
      }
    };
  });

  myApp.controller('TestThreeController', function($scope, $modal) {
    $scope.modalNumber = 1;
    $scope.txt = 'type something';
    var myModal = $modal({scope: $scope, templateUrl: '../modal.tpl.html', show: false});
    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    };
    $scope.changeModalText = function() {
      $scope.modalNumber++;
      };
  });

  myApp.controller('TestFourController', function($scope, $http) {
    $scope.repos = [];
    $scope.loadRepos = function () {
      $http.get('https://api.github.com/repositories').then(function (repos) {
        $scope.repos = repos.data;
      });
    };
  });


    myApp.run(['$rootScope', '$http', '$location', "$route", function ($scope, $http, $location, $route) {
        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
            $scope.part = $route.current.activetab;
            console.log('\nIn routeChange with current active tab: ' + $route.current.activetab );
            console.log('location path: [' + $location.path()+']\tAbsUrl: [' + $location.absUrl()+']\turl: [' + $location.url()+']');
        });
    }]);

}());
