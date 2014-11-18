contactsManager.controller('MainController',['$scope', '$http',  function ($scope, $http) {
    $scope.contacts = null;
    $scope.formData = {};
    $scope.action = 'Add';

    // when landing on the page, get all contacts and show them
    $http.get('/api/getContacts')
        .success(function(data) {
          $scope.contacts = data;
          console.log(data, $scope.contacts);
        })
        .error(function(data) {
          $scope.contacts = null;
          console.log('Error: ' + data);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.addContact = function() {
      if(!$scope.formData.favourite)
        $scope.formData.favourite = false;

      if($scope.formData._id != null || $scope.formData._id != undefined){
        $scope.deleteContact($scope.formData._id);
      }
      
      console.log("formData",$scope.formData);
      $http.post('/api/saveContact', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.contacts = data;
          console.log("data added",data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // delete a contact after checking it
    $scope.deleteContact = function(id) {
      console.log(id);
      $http.delete('/api/deleteContact/' + id)
        .success(function(data) {
          $scope.contacts = data;
          console.log("After delete",data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.editContact = function(contact){
      $scope.action = 'Edit';
      $scope.formData = contact;
      console.log(contact);
    };

    $scope.resetForm = function(){
      $scope.action = 'Add';
      $scope.formData = {};
      $scope.addContactForm.$setPristine();
    };

}]);