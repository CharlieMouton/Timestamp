var Timestamp = angular.module('Timestamp', []);

function mainController($scope, $http) {
	var currentTime;
	// $scope.formData = {};

	// $http.get('/')
	// 	.success(function(data){
	// 		$scope.toDos = data;
	// 	})
	// 	.error(function(data){
	// 		console.log('Error:' + data);
	// 	});


	//called on click of form with whole youtube link
	//loads video and all comments
	//ng-click = getVideo(string)
	$scope.getVideo = function(vidLink){
		//display video from youtube
		//check for comments based on id
		var vidId = vidLink.split("=")[1];
		console.log(vidId);
		$http.get('api/comments/' + vidId)
			.success(function(data){
				$scope.comments = data;

			   	var tag = document.createElement('script');

			    tag.src = "https://www.youtube.com/iframe_api";
			    var firstScriptTag = document.getElementsByTagName('script')[0];
			    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			      // 3. This function creates an <iframe> (and YouTube player)
			      //    after the API code downloads.
			    var player;
			    function onYouTubeIframeAPIReady() {
			        player = new YT.Player('player', {
			          	height: '390',
			          	width: '640',
			          	videoId: vidId,
			          	events: {
			            	'onReady': onPlayerReady,
			            	'onStateChange': onPlayerStateChange          
			            }
			        });
			     }

			      // 4. The API will call this function when the video player is ready.
			    function onPlayerReady(event) {
			        event.target.playVideo();
			    }

			      // 5. The API calls this function when the player's state changes.
			      //    The function indicates that when playing a video (state=1),
			      //    the player should play for six seconds and then stop.
			    var done = false;

			    function onPlayerStateChange(event) {
			        if (event.data == YT.PlayerState.PLAYING && !done) {

			          // setTimeout(stopVideo, 6000);
			          done = true;
			        }
			    }
			    	      //THIS IS WHERE IT IS PRINTING THE CURRENT TIME YAY
      			setInterval(function(){
   				// here you'd raise some sort of event based on the value of getCurrentTime();
   					currentTime = player.getCurrentTime
   					console.log(currentTime)
 				}, 100); // polling 8 times a second, to make sure you get it every time it changes.
			})
			.error(function(data){
					console.log('Error:' + data);
			});
	};


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
	// };
	}

	//need some kind of front end function to move things off the screen

}
// 2. This code loads the IFrame Player API code asynchronously.
   
// function loginController($scope, $http){

// }
