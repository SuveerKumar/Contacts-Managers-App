contactsManager
  .factory('getContactsService', ['$q, $http', function($q, $http) {
    this.getContacts = function(){
      var deferred = $q.defer();
      $http.get('/api/getContacts')
        .success(function(data) {
          deferred.resolve(data);
          console.log(data);
        })
        .error(function(data) {
          deferred.reject(data);
          console.log('Error: ' + data);
        });

      return deferred.promise;
    };
  }]);