contactsManager
  .directive('addContact', function(){
    return {
      restrict: 'A',
      templateUrl: '/directives/templates/addContact.partial.html'
    };
  });