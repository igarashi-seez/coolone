	var ytData = [
		{
			id: 'DCIQVDvXuj4',
			area: 'bg-player',
			//autoplay: 1,
			autoplay: 0,
			controls: 0,
			showinfo: 0
		}, {
			//MOVIE
			id: 'q5tlQQtufkE',
			area: 'player01',
			autoplay: 0,
			controls: 1,
			showinfo: 0
		}
	];

	var ytPlayer = [];
	var ytPlaying, ytStop, ytPlay;

	var api = document.createElement('script');
	api.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(api, firstScriptTag);

	function onYouTubeIframeAPIReady() {
//		$('#bg-player').css({'opacity': 0});
		for(var i = 0; i < ytData.length; i++) {
			ytPlayer[i] = new YT.Player(ytData[i]['area'], {
//				height: ytHeight,
//				width: ytWidth,
				videoId: ytData[i]['id'],
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				},
				playerVars: {
					rel: 0,
					autoplay: ytData[i]['autoplay'],
					controls: ytData[i]['controls'],
					showinfo: ytData[i]['showinfo'],
					wmode : "transparent"
				}
			});
		}
	}

	function onPlayerStateChange(event) {
		for(var i = 1; i < ytData.length; i++) {
			var thisState = ytPlayer[i].getPlayerState();
			if( thisState == 1 && ytPlaying == undefined) {
				ytPlaying = i;
			} else if(thisState == 1 && ytPlaying != i) {
				ytStop = ytPlaying;
				ytPlay = i;
			} else {
			}
		}

		if(ytStop != undefined) {
				ytPlayer[ytStop].pauseVideo();
				ytStop = undefined;
		}
		if(ytPlay != undefined) {
				ytPlaying = ytPlay;
				ytPlay = undefined;
		}

		var ytStatus = ytPlayer[0].getPlayerState();
		if (ytStatus == YT.PlayerState.ENDED) {
			ytPlayer[0].playVideo();
			ytPlayer[0].mute();
		}
	}

	function onPlayerReady(e) {
		function startMovie(){
			ytPlayer[0].playVideo();
			ytPlayer[0].mute();
		}
	}

	$(function() {
		$('.movie-change').on('click', 'a', function(e){
			e.preventDefault();
			var videoId = $(this).attr('href').replace(/https?:\/\/[0-9a-zA-Z\.]+\//, "");
			ytPlayer[1].cueVideoById(videoId);
		});

	});

