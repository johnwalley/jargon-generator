'use strict';

/* Controllers */

angular.module('riskJargonGenerator.controllers', ['riskJargonGenerator.services']).
controller('JargonCtrl', ['$scope', 'Jargon', 'JargonService', 'History', '$q', function($scope, Jargon, JargonService, History, $q) {
	
  $scope.isCollapsed = true;

  var history = new Array();

	$scope.refresh = function() {
    var sentence = Jargon.generate(jargon);
    $scope.sentence = sentence;
    History.history.Update(sentence);
	}

  // Get the collections from our data definitions
  var verbs = new JargonService.verbs();
  var abbreviations = new JargonService.abbreviations();
  var nouns = new JargonService.nouns();
  var adjectives = new JargonService.adjectives();

  var jargon =  {
  	verbs: verbs,
  	abbreviations: abbreviations,
  	nouns: nouns,
  	adjectives: adjectives,
  };

  // Wait for all promises to resolve before creating initial jargon.
  $q.all([verbs.load(), abbreviations.load(), nouns.load(), adjectives.load()]).then( function() { $scope.refresh() });

  $scope.verbs = verbs;
  $scope.abbreviations = abbreviations;
  $scope.nouns = nouns;
  $scope.adjectives = adjectives;

  $scope.addVerb = function() {
  	verbs.addWord($scope.newverb);
    $scope.newverb = "";
  };

  $scope.removeVerb = function(verb) {
    verbs.removeWord(verb);
  }

  $scope.addAbbreviation = function() {
  	abbreviations.addWord($scope.newabbreviation);
    $scope.newabbreviation = "";
  };

  $scope.removeAbbreviation = function(abbreviation) {
    abbreviations.removeWord(abbreviation);
  }  

  $scope.addNoun = function() {
  	nouns.addWord($scope.newnoun)
    $scope.newnoun = "";
  };

  $scope.removeNoun = function(noun) {
    nouns.removeWord(noun);
  }    

  $scope.addAdjective = function() {
  	adjectives.addWord($scope.newadjective);
    $scope.newadjective = "";
  };

  $scope.removeAdjective = function(adjective) {
    adjectives.removeWord(adjective);
  }     
}]).
controller('DropdownCtrl', ['$scope', 'History', function($scope, History) {
  $scope.items = History.history;
}]).
controller('JoinCtrl', ['ParseQueryAngular', '$scope', function(ParseQueryAngular, $scope) {
  $scope.submitForm = function() {
    // check to make sure the form is completely valid
    if ($scope.userForm.$valid) {
      var user = new Parse.User();

      user.set('username', $scope.user.username);
      user.set('password', $scope.user.password);

      ParseQueryAngular(user, { functionToCall:"signUp", params:[null] }).then(function(registeredUser) {

          // since we know that the result will be inside the Angular digest, we make use of Angular's two-way data binding and automatically update all our views by simply updating the user object

          $scope.debug = registeredUser;

      }, function(error) {
          // any rejected promises in the chain will be caught here
          console.log(error);
      });      
    }
  };  
}]).
controller('LoginCtrl', ['ParseQueryAngular', '$scope', function(ParseQueryAngular, $scope) {
  $scope.submitForm = function() {
    // check to make sure the form is completely valid
    if ($scope.userForm.$valid) {
      var user = new Parse.User();

      user.set('username', $scope.user.username);
      user.set('password', $scope.user.password);

      ParseQueryAngular(user, { functionToCall:"logIn", params:[null] }).then(function(registeredUser) {

          // since we know that the result will be inside the Angular digest, we make use of Angular's two-way data binding and automatically update all our views by simply updating the user object

          $scope.debug = "Success";

      }, function(error) {
          // any rejected promises in the chain will be caught here
          $scope.debug = "Failure"
          console.log(error);
      });      
    }
  };  
}]);
