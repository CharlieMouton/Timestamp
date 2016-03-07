var Timestamp = angular.module('Timestamp', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/')
		.success(function(data){
			$scope.toDos = data;
		})
		.error(function(data){
			console.log('Error:' + data);
		});

	$scope.newComment = function(){
		// $http.post('api/toDos', $scope.formData)
		// 	.success(function(data){
		// 		$scope.formData = {};
		// 		$scope.toDos = data;
		// 	})
		// 	.error(function(data){
		// 		console.log('Error:' + data);
		// 	});
	};

	$scope.getVideo = function(){
		//display video from youtube
		//check for comments based on id
	// 	$http.post('/api/move/toDos/' + id)
	// 		.success(function(data){
	// 			$scope.toDos = data;
	// 		})
	// 		.error(function(data){
	// 			console.log('Error:' + data);
	// 		});
	// };
	}

	$scope.getTime = function(id){
		//get time from youtube comment
	// 	$http.post('/api/move/toDos/' + id)
	// 		.success(function(data){
	// 			$scope.toDos = data;
	// 		})
	// 		.error(function(data){
	// 			console.log('Error:' + data);
	// 		});
	// };
	}


// function loginController($scope, $http){

// }
