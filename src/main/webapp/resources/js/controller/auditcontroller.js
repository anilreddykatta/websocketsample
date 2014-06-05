blueOpsModule.factory('Audits',['$resource',  function($resource){
	//We have to escape port number when using in $resource, because semi-colon has special meaning in $resource
	return $resource('http://localhost\\:8080/blueops/blueops2/test/blueTest/auditrail'); 
}]);
var TEMPLATE_URL = "/resources/html/templates/";
blueOpsModule.controller('AuditCtrl', ['$scope', 'Audits', '$timeout', '$modal', '$rootScope', function($scope, Audits, $timeout, $modal, $rootScope){
	$scope.username = '';
	$scope.refresh = function() {
		$scope.audits = Audits.query();
	};
    $scope.opts = {
			    backdrop: true,
			    keyboard: true,
			    backdropClick: true,
			    scope: (function() {
			      var scope = $rootScope.$new();
			      scope.error = $scope.error;
			      return scope;
			    })(),
			    templateUrl: TEMPLATE_URL + 'dialog_template.html',
			    controller: 'SessionExpireDialogCtrl'
	 };
	 $scope.dialog = function() {
		$timeout(function(){
			var d = $modal.open($scope.opts);
		    d.result.then(function(result) {
		      if (result) {
		        alert('dialog closed with result: ' + result);
		      }
		    });
		}, 4000);
	 };
	 $scope.dialog();
}]);

blueOpsModule.controller('SessionExpireDialogCtrl',['$scope', '$modalInstance' , function($scope, $modalInstance){
	  $scope.error = $scope.error || {
	    title: "Session Expires Alert",
	    message: "Your Session is Going to Expire"
	  };

	  $scope.close = function(result) {
	    $modalInstance.close(result);
	  };
}]);