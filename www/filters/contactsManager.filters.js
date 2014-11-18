angular.module('contactsManager')
  .filter('capitalCase', function() {
    return function(input) {
      var out = input.charAt(0).toUpperCase() + input.substr(1, input.length);
      return out;
    };
  });