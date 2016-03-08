var Timestamp = angular.module('Timestamp', ['ngRoute']);


Timestamp.config(function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: '/html/login.html',
		controller: 'loginController'
	})
	.when('/', {
		templateUrl: '/html/main.html',
		controller: 'mainController'
	})
});

Timestamp.controller('loginController', function($scope,$http) {

	$scope.login = function() {

	}
});

Timestamp.controller('mainController', function($scope, $http) {

	var currentTime;

	var player;

	//called on click of form with whole youtube link
	//loads video and all comments
	$scope.getVideo = function(vidLink){
		//display video from youtube
		//check for comments based on id
		var vidId = vidLink.split("=")[1];
		console.log(vidId);
		$http.get('api/comments/' + vidId)
			.success(function(data){
				$scope.comments = data.commentList;
				$scope.currentUser = data.username;
			      // 3. This function creates an <iframe> (and YouTube player)
			      //    after the API code downloads.
			     console.log('before main function')
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
   					currentTime = player.getCurrentTime()
   					console.log(currentTime)
 				}, 100); // polling 8 times a second, to make sure you get it every time it changes.
			})
			.error(function(data){
					console.log('Error:' + data);
			});
	};


	$scope.setTime = function(numstart){
		player.seekTo(numstart, true);
	}


	$scope.newComment = function(){
		console.log($scope.currentUser, " is the current user!");
		$http.post('api/comments/new',{
				'comment': $scope.newCommentText,
				'time': currentTime,
				'videoId': $scope.vidLink.split("=")[1],
				'user': $scope.currentUser
			})
			.success(function(data){
				console.log(data, "data posted to server");
				$scope.comments.push(data);
			})
			.error(function(data){
				console.log('Error:' + data);
			});
	};


	$scope.getTime = function(){
		console.log(currentTime);
		//get time from youtube comment
	// 	$http.post('/api/move/toDos/' + id)
	// 		.success(function(data){
	// 			$scope.toDos = data;
	// 		})
	// 		.error(function(data){
	// 			console.log('Error:' + data);
	// 		});
	};
});

	//need some kind of front end function to move things off the screen


// 2. This code loads the IFrame Player API code asynchronously.

// function loginController($scope, $http){

// }
