contactsManagerModule
  .service('getContactsService', ['$log','$q', '$http', function($log, $q, $http) {
    this.getContacts = function(){
      var deferred = $q.defer();
      $http.get('/api/getContacts')
        .success(function(data) {
          deferred.resolve(data);
          $log.log('Fetched contacts: ', data);
        })
        .error(function(data) {
          deferred.reject(data);
          $log.log('Error while fetching data: ', data);
        });

      return deferred.promise;
    };
  }])
  .service('saveContactService', ['$log', '$q', '$http', function($log, $q, $http) {
    this.saveContact = function(formData){
      $log.log("formData", formData);
      var deferred = $q.defer();
      $http.post('/api/saveContact', formData)
        .success(function(data) {
          deferred.resolve(data);
          $log.log('Contact Saved: ',data);
        })
        .error(function(data) {
          deferred.reject(data);
          $log.log('Error while saving data: ', data);
        });

      return deferred.promise;
    };
  }])
  .service('deleteContactService', ['$log', '$q', '$http', function($log, $q, $http) {
    this.deleteContact = function(contactId){
      $log.log("Contact ID to be deleted", contactId);
      var deferred = $q.defer();
      $http.delete('/api/deleteContact/' + contactId)
        .success(function(data) {
          deferred.resolve(data);
          $log.log("After delete operation: ",data);
        })
        .error(function(data) {
          deferred.reject(data);
          $log.log('Error while deleting: ' + data);
        });

      return deferred.promise;
    };
  }]);