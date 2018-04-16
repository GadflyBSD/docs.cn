angular.module('app')
	.controller('appCtrl', function($scope, $state){
		console.log('appCtl');
	})
	.controller('fullCtrl', function($scope, $state){
		console.log('fullCtrl');
	})
	.controller('homeCtrl', function($scope, $state, $sce){
		$scope.description = $sce.trustAsHtml($state.current.ncyBreadcrumb.description);
		console.log('homeCtrl');
	})
	.controller('appPage01Ctrl', function($scope, $sce, $state, $http){
		$scope.description = $sce.trustAsHtml($state.current.ncyBreadcrumb.description);
		$http.get('list.json', {}).then(function (result) {
			$scope.list = result.data;
		})
	})
	.controller('appPage02Ctrl', function($scope, $state, $sce, loadData){
		$scope.description = $sce.trustAsHtml($state.current.ncyBreadcrumb.description);
		$scope.list = loadData;
	})
	.controller('fullFormCtrl', function($scope, $state, $sce){
		$scope.description = $sce.trustAsHtml($state.current.ncyBreadcrumb.description);
		$scope.form = {}
		$scope.submit = function(){
			console.log($scope.form);
		}
	})