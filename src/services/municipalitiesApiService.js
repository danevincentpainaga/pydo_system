angular.module('psmsApp').factory('municipalitiesApiService', ['$http', '$rootScope', function($http, $rootScope){
  
  var baseUrl = "http://localhost:8000/";

  return{
    getMunicipalities: function(){
      return $http.get(baseUrl+'api/getMunicipalities', {
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
	}
}]);