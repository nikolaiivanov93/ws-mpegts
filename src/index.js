// import './style.css';
import mpegts from './mpegts';

if (mpegts.getFeatureList().mseLivePlayback) {
    let videoElement = document.getElementById('videoElement');
    // debugger;
    let player = mpegts.createPlayer({
        type: 'mse',  // could also be mpegts, m2ts, flv
        isLive: true,
        url: 'wss://stage.cloud.atmosfera.cam/ws-mse/mr-rust-main/'
    });
    player.attachMediaElement(videoElement);
    player.load();
    player.play();

    // console.log(player.open());

    let featureList = mpegts.getFeatureList();
    console.log('getFeatureList()',featureList);

    let lggingControl = mpegts.LoggingControl;
    console.log('lggingControl',lggingControl);

    player.muted = true;
    // console.log("MUTED",player.muted);
    
    // const mutedBtn = docuement.querySelector('.btn__muted');
    // const wrapp = document.querySelector('.wrapper');
    const pauseBtn = document.querySelector('.btn__pause');
    const resumeBtn = document.querySelector('.btn__resume');
    const eventBtn = document.querySelector('.btn__event-metric');
    const errorTypeBtn = document.querySelector('.btn__error-types');
    const errorDetailBtn = document.querySelector('.btn__error-details');
    const btnQuality = document.querySelectorAll('.btn__quality');
    
    // const button = document.querySelectorAll('.btn');
    let showInfoEvent = false;
    let showInfoErrorType = false;
    let showInfoErrorDetails = false;

    // btnQuality.addEventListener('click', () => {
    //     let resolution = 360;
    //     player.onWebsSend(resolution);
    // });
    btnQuality.forEach(item => {
        item.addEventListener('click', () => {
            // console.log(item.innerHTML);
            let resolution = item.innerHTML;
            player.onWebsSend(resolution);
            // let videoElem = document.createElement('video');
            // let wrapp = document.querySelector('.wrapper');
            // wrapp.appendChild(videoElem);
            // player.detachMediaElement();
            // player.attachMediaElement(videoElement);
            // player.load();
            // player.play();
        });
    });

    pauseBtn.addEventListener('click', () => {
        player.pause();
    });

    resumeBtn.addEventListener('click', () => {
        player.play();
    });

    // mutedBtn.addEventListener('click', () => {
    //     player.muted = false;
    //     console.log('MUT', player.muted);
    // });

    function showMetric(btn, item, info, func) {

        btn.addEventListener('click', () => {
            let eventInfo = document.querySelector(item);
            // event = document.createElement('div');
            if (info === false) {
                eventInfo.style.display = 'flex';
                btn.style.cssText = `
                    background-color: rgb(65, 105, 255);
                    color: #fff;
                `;
                // eventInfo.innerHTML = `
                //     <div class="event__title">Event</div>
                //     <div class="metric"></div>
                // `;
                info = true;
                // document.body.appendChild(eventInfo);
                func();
            } else if (info === true){
                // eventInfo.innerHTML = ``;
                eventInfo.style.display = 'none';
                btn.style.cssText = ``;
                info = false;
                func();
            }
            
        });
    }

    showMetric(eventBtn, '.event', showInfoEvent, eventMetric);
    showMetric(errorTypeBtn, '.errorTypes', showInfoErrorType, errorTypes);
    showMetric(errorDetailBtn, '.errorDetails', showInfoErrorDetails, errorDetails);

    function eventMetric() {
        // if (showInfo) {
            player.on(mpegts.Events.STATISTICS_INFO, function(data) {
                const metric = document.querySelector('.metric');
        
                metric.innerHTML = `currentSegmentIndex: ${data.currentSegmentIndex} <br>
                decodedFrames: ${data.decodedFrames} <br>
                droppedFrames: ${data.droppedFrames} <br>
                hasRedirect: ${data.hasRedirect} <br>
                loaderType: ${data.loaderType} <br>
                playerType: ${data.playerType} <br>
                speed: ${data.speed} <br>
                totalSegmentCount: ${data.totalSegmentCount} <br>
                url: ${data.url} <br>
                `;
                // console.log(data);
            });
            
            player.on(mpegts.Events.ERROR, function(data) {
                console.log('error',data);
            });
        
            player.on(mpegts.Events.LOADING_COMPLETE, function(data) {
                console.log('loadingComplete',data);
            });
            player.on(mpegts.Events.RECOVERED_EARLY_EOF, function(data) {
                console.log('RECOVERED_EARLY_EOF',data);
            });
            player.on(mpegts.Events.MEDIA_INFO, function(data) {
                console.log('MEDIA_INFO',data);
            });
            player.on(mpegts.Events.METADATA_ARRIVED, function(data) {
                console.log('METADATA_ARRIVED',data);
            });
            player.on(mpegts.Events.SCRIPTDATA_ARRIVED, function(data) {
                console.log('SCRIPTDATA_ARRIVED',data);
            });
            player.on(mpegts.Events.TIMED_ID3_METADATA_ARRIVED, function(data) {
                console.log('TIMED_ID3_METADATA_ARRIVED',data);
            });
            player.on(mpegts.Events.PES_PRIVATE_DATA_ARRIVED, function(data) {
                console.log('PES_PRIVATE_DATA_ARRIVED',data);
            });
        // } else {
        //     return;
        // }
    }
    
    function errorTypes() {
        player.on(mpegts.ErrorTypes.NETWORK_ERROR, function(data) {
            console.log('NETWORK_ERROR',data);
        });
        player.on(mpegts.ErrorTypes.MEDIA_ERROR, function(data) {
            console.log('MEDIA_ERROR',data);
        });
        player.on(mpegts.ErrorTypes.OTHER_ERROR, function(data) {
            console.log('OTHER_ERROR',data);
        });
    }

    function errorDetails() {
        player.on(mpegts.ErrorDetails.NETWORK_EXCEPTION, function(data) {
            console.log('NETWORK_EXCEPTION',data);
        });
        player.on(mpegts.ErrorDetails.NETWORK_STATUS_CODE_INVALID, function(data) {
            console.log('NETWORK_STATUS_CODE_INVALID',data);
        });
        player.on(mpegts.ErrorDetails.NETWORK_TIMEOUT, function(data) {
            console.log('NETWORK_TIMEOUT',data);
        });
        player.on(mpegts.ErrorDetails.NETWORK_UNRECOVERABLE_EARLY_EOF, function(data) {
            console.log('NETWORK_UNRECOVERABLE_EARLY_EOF',data);
        });
        player.on(mpegts.ErrorDetails.MEDIA_MSE_ERROR, function(data) {
            console.log('MEDIA_MSE_ERROR',data);
        });
        player.on(mpegts.ErrorDetails.MEDIA_FORMAT_ERROR, function(data) {
            console.log('MEDIA_FORMAT_ERROR',data);
        });
        player.on(mpegts.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED, function(data) {
            console.log('MEDIA_FORMAT_UNSUPPORTED',data);
        });
        player.on(mpegts.ErrorDetails.MEDIA_CODEC_UNSUPPORTED, function(data) {
            console.log('MEDIA_CODEC_UNSUPPORTED',data);
        });
    }

    
    // console.log(player.Events);
    // const ws = new WebSocket('wss://stage.cloud.atmosfera.cam/ws-mse/mr-rust-test/');
    // ws.addEventListener('open', function(e) {
    //     // setTimeout(() => {
            // let quality = '720p';
    //         ws.send(JSON.stringify({ quality }));
    //     // }, 5000);
    // });

    // let ping = 'PING';
    // setTimeout(() => {
    //     setInterval(() => {
        
    //         player.onWebsSend(ping);
    //     }, 2000);
    // }, 2000);
    // console.log(p);
    // console.log('WEBSOCKET',player.WebSocketLoader());

}