'use strict';

// Declare app level module which depends on filters, and services
angular.module('jargonGenerator', [
	'jargonGenerator.controllers',
  'jargonGenerator.services',
  'jargonGenerator.directives',
  'jargonGenerator.filters',
  'ui.router',
  'ui.bootstrap',
  'ParseServices',
  'ExternalDataServices'
]).
config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, send to /jargon
  $urlRouterProvider.otherwise("/jargon");

  $stateProvider
  .state('jargon', {
  	url: "/jargon",
  	templateUrl: "partials/jargon.html",
  	controller: 'JargonCtrl',
    resolve: {
      verbs: function(JargonService) {
        var verbs = new JargonService.verbs();
        return verbs.load();
      },
      abbreviations: function(JargonService) {
        var abbreviations = new JargonService.abbreviations();
        return abbreviations.load();
      },
      nouns: function(JargonService) {
        var nouns = new JargonService.nouns();
        return nouns.load();
      },
      adjectives: function(JargonService) {
        var adjectives = new JargonService.adjectives();
        return adjectives.load();
      }
    }
  })
  .state('about', {
  	url: "/about",
  	templateUrl: "partials/about.html"
  })
  .state('join', {
    url: "/join",
    templateUrl: "partials/join.html",
    controller: 'JoinCtrl'
  })   
  .state('login', {
    url: "/login",
    templateUrl: "partials/login.html",
    controller: 'LoginCtrl'
  })  
}).
run(['ParseSDK', 'ExtendParseSDK', '$rootScope', '$state', '$stateParams',
function(ParseService, ExtendParseSDK, $rootScope, $state, $stateParams) {

    // Parse is initialised by injecting the ParseService into the Angular app
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
