var moment = require('moment');
var app = angular.module('psmsApp');
app.factory('moment', function(){
  return {
    changeFormat: function(passedDate){
      return moment(passedDate).format("DD/MM/YYYY");
    },
    validateDate: function(date){
    	return moment(date, 'MM/DD/YYYY',true).isValid()
    }
  }
});