var angulartoDo = angular.module('angulartoDo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('api/toDos')
		.success(function(data){
			$scope.toDos = data;
		})
		.error(function(data){
			console.log('Error:' + data);
		});

	$scope.createtoDo = function(){
		$http.post('api/toDos', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.toDos = data;
			})
			.error(function(data){
				console.log('Error:' + data);
			});
	};

	$scope.movetoDo = function(id){
		$http.post('/api/move/toDos/' + id)
			.success(function(data){
				$scope.toDos = data;
			})
			.error(function(data){
				console.log('Error:' + data);
			});
	};
}

function filterController($scope, $http){
		$scope.toDos = $http.get('api/toDos')
		.success(function(data){
			$scope.toDos = data;
			return $scope.toDos
		})
		.error(function(data){
			console.log('Error:' + data);
		});

		$scope.title = $scope.toDo.text;
		$scope.editorEnabled = false;
		  
		$scope.enableEditor = function() {
		    $scope.editorEnabled = true;
		    $scope.editableTitle = $scope.toDo.text;
		};
		  
		$scope.disableEditor = function() {
		    $scope.editorEnabled = false;
		};
		  
		$scope.save = function(id) {
		    $scope.toDo.text = $scope.editableTitle;
		    $scope.disableEditor();
		    $http.post('/api/toDos/edit/' + id, {text:$scope.toDo.text})
		    	.success(function(data){
		    		console.log('saved correctly')

		    	})
		    	.error(function(data){
					console.log('Error:' + data);
				});
		};

}

//http://jsfiddle.net/timriley/GVCP2/
