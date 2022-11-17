/*
 * Author: Valera Rozuvan
 * Date: 27.01.2014
 *
 *
 * Demonstrate the ability to set a start time for a YouTube video without
 * using the default YouTube API parameter. The way we do this is as follows:
 *
 *     1.) Wait until user plays the video.
 *     2.) When the video begins playing, setup an update() function that will
 *         run every 200 ms.
 *     3.) Within the update() function check if the player reports a proper
 *         current time. If it does (this means that the video really began
 *         playing), seek the video to desired start time. Make sure that when
 *         the update() function executes next, it doesn't seek again to
 *         the start time.
 *
 * As can be seen, this approach works both in latest Chrome, and Firefox.
 *
 * The original YouTube API demo demo taken from
 *
 *     https://developers.google.com/youtube/iframe_api_reference
 *
 * and modified to include extra video initialization parameters.
 *
 *
 *  More JS fiddles at: https://github.com/valera-rozuvan/js-fiddles
 */

$(document).ready(function () {
    var tag, firstScriptTag, player, updateCounter, updateInterval,
        firstTimeSeek;

    updateCounter = 0;
    updateInterval = null;

    // When we can, perform a first time seek to some position.
    firstTimeSeek = true;

    // 2. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            playerVars: {
                // controls: 0,
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
        $('#output').append('[onReady] event<br />');
    }

    // 5. The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
        var PlayerState = {
            UNSTARTED: -1,
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        }, PlayerStateTxt = [
            'UNSTARTED',
            'ENDED',
            'PLAYING',
            'PAUSED',
            'BUFFERING',
            '',
            'CUED'
        ];

        $('#output').append(
            'onStateChange event: data = [' +
                PlayerStateTxt[event.data + 1] +
            '] event<br />'
        );

        switch (event.data) {
            case PlayerState.ENDED:
                onEnded();
                break;
            case PlayerState.PLAYING:
                onPlay();
                break;
            case PlayerState.PAUSED:
                onPause();
                break;
        }
    }

    function update() {
        var currentTime = player.getCurrentTime();

        updateCounter += 1;

        $('#current_time').html(currentTime);
        $('#update').html(updateCounter);

        if (isFinite(currentTime)) {
            if (firstTimeSeek) {
                player.seekTo(30);

                firstTimeSeek = false;
            }
        }
    }

    function onPlay() {
        if (!updateInterval) {
            updateInterval = setInterval(
                update, 200
            );

            update();
        }
    }

    function onPause() {
        clearInterval(updateInterval);
        updateInterval = null;
    }

    function onEnded() {
        clearInterval(updateInterval);
        updateInterval = null;
    }
});
