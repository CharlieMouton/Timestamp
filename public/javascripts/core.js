// This file contains both the angular module and controllers that we use in our file.
// It contains all the frontside logic, as well as several GET and POST requests that communicate
// with the server. 


var Timestamp = angular.module('Timestamp', ['ngRoute']);

// Nice use of the routeProvider!! Love it
Timestamp.config(function($routeProvider) {
	$routeProvider
	// You can use the same controller for /login and / as you do and not use a different route 
	// handling. 
	.when('/login', {
		templateUrl: '/html/login.html',
		controller: 'loginController'
	})
	.when('/', {
		templateUrl: '/html/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: '/html/main.html',
		controller: 'mainController'
	})
});

Timestamp.controller('loginController', function($scope,$http) {

	$scope.login = function() {

	}
});

Timestamp.controller('mainController', function($scope, $http, $location) {
	$scope.linkSubmitted = false;
	$scope.relComments = [];
	var currentTime;
	$scope.currCommIndex = 0;
	var player;


	$http.get('/api/pageLoad')
		.success(function(data){
			$scope.currentUser = data.name;
		})

	//called on click of form with whole youtube link
	//loads video and all comments
	$scope.getVideo = function(vidLink){
		//display video from youtube
		//check for comments based on id
		$scope.linkSubmitted = true;
		var vidId = vidLink.split("=")[1];
		console.log(vidId);
		$http.get('api/comments/' + vidId)
			.success(function(data){
				$scope.comments = data.commentList;
				$scope.currentUser = data.username;
			      // 3. This function creates an <iframe> (and YouTube player)
			      //    after the API code downloads.
			     console.log('before main function')
			     if(player){
			     	player.loadVideoById(vidId);
			     } else{
			    function onYouTubeIframeAPIReady() {
			        player = new YT.Player('player', {
			          	height: '390',
			          	width: '640',
			          	videoId: vidId,
			          	events: {
			            	'onReady': onPlayerReady,
			            	'onStateChange': onPlayerStateChange,
			            	'onError': onErr
			            }
			        });
			     	console.log('IN YOUTUBE FRAME MAKER')
			     }

			     onYouTubeIframeAPIReady();

			      // 4. The API will call this function when the video player is ready.
			    function onPlayerReady(event) {
			        event.target.playVideo();
			    }

			      // 5. The API calls this function when the player's state changes.
			      var done = false;
			      //    The function indicates that when playing a video (state=1),
			      //    the player should play for six seconds and then stop.
			    function onPlayerStateChange(event) {
			        if (event.data == YT.PlayerState.PLAYING && !done) {
			          done = true;
			        }
			      }
			    function onPlayerStateChange(event) {
			        if (event.data == YT.PlayerState.PLAYING && !done) {

			          // setTimeout(stopVideo, 6000);
			          done = true;
			        }
			    }

			    function onErr(event){
			    	console.log("err");
			    }

			    	      //THIS IS WHERE IT IS PRINTING THE CURRENT TIME YAY
      			setInterval(function(){
	   					// here you'd raise some sort of event based on the value of getCurrentTime();
	   					currentTime = player.getCurrentTime();
							for(var index = 0; index<$scope.comments.length; index++) {
								if ($scope.comments[index].time > currentTime) {
									$scope.currCommIndex = index;
									break;
								}
							};

									if ($scope.currCommIndex === 0) {
										$scope.$apply(function(){
											$scope.relComments = [$scope.comments[$scope.currCommIndex],$scope.comments[$scope.currCommIndex+1],$scope.comments[$scope.currCommIndex+2]]
										})
									} else if ($scope.currCommIndex === 1) {
										$scope.$apply(function(){
											$scope.relComments = [$scope.comments[$scope.currCommIndex-1],$scope.comments[$scope.currCommIndex],$scope.comments[$scope.currCommIndex+1],$scope.comments[$scope.currCommIndex+2]]
										})
									} else if ($scope.currCommIndex === $scope.comments.length-1) {
										$scope.$apply(function(){
											$scope.relComments = [$scope.comments[$scope.currCommIndex-2],$scope.comments[$scope.currCommIndex-1],$scope.comments[$scope.currCommIndex]]
										})
									} else if ($scope.currCommIndex === $scope.comments.length-2) {
										$scope.$apply(function(){
											$scope.relComments = [$scope.comments[$scope.currCommIndex-2],$scope.comments[$scope.currCommIndex-1],$scope.comments[$scope.currCommIndex], $scope.comments[$scope.currCommIndex+1]]
										})
									} else {
										$scope.$apply(function(){
											$scope.relComments = [$scope.comments[$scope.currCommIndex-2],$scope.comments[$scope.currCommIndex-1],$scope.comments[$scope.currCommIndex],$scope.comments[$scope.currCommIndex+1],$scope.comments[$scope.currCommIndex+2]]
										})
									}
 						}, 100); // polling 8 times a second, to make sure you get it every time it changes.
			};
			})
			.error(function(data){
					console.log('Error:' + data);
			});


	};

	$scope.randVid = function() {
		$http.
		$scope.comments
	}


	$scope.setTime = function(numstart){
		player.seekTo(numstart, true);
	}


	$scope.newComment = function(){
		console.log($scope.currentUser, " is the current user!");
		var newComment = {
				'comment': $scope.newCommentText,
				'time': currentTime,
				'videoId': $scope.vidLink.split("=")[1],
				'user': $scope.currentUser
			};

		$http.post('api/comments/new',newComment)
			.success(function(data){
				console.log($scope.comments, "data posted to server");
				$scope.comments.push(newComment);
				$scope.comments.sort(function(a, b) {
    				return parseFloat(a.time) - parseFloat(b.time);
				});
			})
			.error(function(data){
				console.log('Error:' + data);
			});
	};


	$scope.getHomePage = function(){
		$scope.linkSubmitted = false;
		currentTime = 0;
		player.stopVideo();
		$('#player').html("");
	};

	$scope.logout = function(){
		$http.post("/api/logout")
		.success(function(data){
			$location.path('/');
		})
		.error(function(data){
			console.log("Error")
		})
	}
});
