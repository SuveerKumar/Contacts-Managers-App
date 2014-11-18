angular.module('contactsManager')
  .controller('MainController',['$log','$scope', '$http', 'getContactsService', 'saveContactService', 'deleteContactService',  function ($log, $scope, $http, getContactsService, saveContactService, deleteContactService) {
    $scope.contacts = null;
    $scope.formData = {};
    $scope.action = 'Add';

    // when landing on the page, get all contacts and show them
    getContactsService.getContacts().then(function(data){
        $scope.contacts = data;
      },function(errorData){
        $scope.contacts = null;
      });

    // when submitting the add form, send the text to the node API
    $scope.addContact = function() {
      if(!$scope.formData.favourite){
        $scope.formData.favourite = false;
      }

      if($scope.formData._id != null || $scope.formData._id != undefined){
        $scope.deleteContact($scope.formData._id);
      }
      
      saveContactService.saveContact($scope.formData).then(function(data){
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.contacts = data;
        },function(errorData){
          
        });
    };

    // delete a contact after checking it
    $scope.deleteContact = function(id) {
      deleteContactService.deleteContact(id).then(function(data){
          $scope.contacts = data;
        },function(errorData){
          
        });
    };

    $scope.editContact = function(contact){
      $scope.action = 'Edit';
      $scope.formData = contact;
      $log.log('Contact to be edited:', contact);
    };

    $scope.resetForm = function(){
      $scope.action = 'Add';
      $scope.formData = {};
      $scope.addContactForm.$setPristine();
    };

  }]);