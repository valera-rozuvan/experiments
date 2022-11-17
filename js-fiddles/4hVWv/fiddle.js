/*
 * Author: Valera Rozuvan
 * Date: 24.10.2013
 *
 *
 * A simple demonstration that in HTML5 mode, the YouTube API can't properly
 * handle start/end time parameters.
 *
 * If you specify start/end time parameters, then the video starts playing from
 * the start time, and ends playing at the end time. You can't make it play at
 * a time GREATER THAN THE END TIME. You can however, replay the video. In this
 * case it will start playing from the beginning and NOT FROM THE START TIME.
 *
 * The original YouTube API demo demo taken from
 *
 *     https://developers.google.com/youtube/iframe_api_reference
 *
 * and modified to include extra video initialization parameters.
 */

$(document).ready(function () {
    var tag, firstScriptTag, player, done;

    // When player will begin playing, we will set `done` to true.
    // See function `onPlayerStateChange` below.
    done = false;

    // 2. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            playerVars: {
                start: 60,
                end: 90,
                html5: 1,
                wmode: 'transparent',
                rel: 0,
                showinfo: 0,
                enablejsapi: 1,
                modestbranding: 1
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }

    // 3. This code loads the IFrame Player API code asynchronously.
    tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return;

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
});
