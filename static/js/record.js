URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext; //new audio context to help us record


function startRecording() {
    console.log("recordButton clicked");

    /*
    Simple constraints object, for more advanced audio features see
    <div class="video-container"><blockquote class="wp-embedded-content" data-secret="vNsz0nPBL4" style="display: none;"><a href="https://addpipe.com/blog/audio-constraints-getusermedia/">Supported Audio Constraints in getUserMedia()</a></blockquote><iframe class="wp-embedded-content" sandbox="allow-scripts" security="restricted" src="https://addpipe.com/blog/audio-constraints-getusermedia/embed/#?secret=vNsz0nPBL4" data-secret="vNsz0nPBL4" width="600" height="256" title="“Supported Audio Constraints in getUserMedia()” — Pipe Blog" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>
    */

    var constraints = { audio: true, video:false }


    /*
    We're using the standard promise based getUserMedia()
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        /* assign to gumStream for later use */
        gumStream = stream;

        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);

        /*
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
        */
        rec = new Recorder(input,{numChannels:1})

        //start the recording process

        console.log("sdadadasd");
        alert("Recording start");

        rec.record()
        $("img").addClass("animate");
        document.getElementById("msg").innerHTML = "Authentication In Progress"
        var timeleft = 5;

        var downloadTimer = setInterval(function(){
        timeleft--;
        //document.getElementById("countdowntimer").textContent = timeleft;
        if(timeleft <= 0){
        clearInterval(downloadTimer);
        rec.stop();
         alert("stopButton clicked");


        //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        //create the wav blob and pass it on to createDownloadLink
        rec.exportWAV(createDownloadLink);
        }},1000);



    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
//        recordButton.disabled = false;
//        stopButton.disabled = true;

    });
}



function createDownloadLink(blob) {

    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
//    var li = document.createElement('li');
//    var link = document.createElement('a');

    //add controls to the <audio> element
    au.controls = true;
    au.src = url;

    //link the a element to the blob
//    link.href = url;
//    link.download = new Date().toISOString() + '.wav';
//    link.innerHTML = link.download;
//
//    //add the new audio and a elements to the li element
//    li.appendChild(au);
//    li.appendChild(link);

    //add the li element to the ordered list
//    recordingsList.appendChild(li);

    var filename = new Date().toISOString(); //filename to send to server without extension

    // Code to upload

    var xhr=new XMLHttpRequest();
    xhr.onload=function(e) {
   if(this.readyState === 4) {
                  a = JSON.parse(e.target.responseText);
//                  console.log(typeof(a))
//                  console.log(a);
//                  console.log("Server returned: ",a);
//                  alert(a['response']);
                   $("img").removeClass("animate");
                    var check_msg = "Hi ".concat(a['response']).concat("! How can I help You?");
                    document.getElementById("msg").innerHTML = check_msg

                    console.log(check_msg);
                    var msg = new SpeechSynthesisUtterance(check_msg);

                    msg.volume = 0.5
                    window.speechSynthesis.speak(msg);

              }
    };
    var fd=new FormData();

    fd.append("audio_data",blob, filename);
    fd.append('name', "abc");
    xhr.open("POST","/chat",true);
    xhr.send(fd);




//    $.ajax({
// method: "POST",
// url: "/chat",
//datatype:"json",
//data: { 'text':fd,},
//cache: false,
// success: function callbackFunc(jsondata) {
//
//                if(jsondata["status"]=="success"){
//                    response=jsondata["response"];
//                    }
//
//                    $("img").removeClass("animate");
//                    var check_msg = "Hi ".concat(response).concat("! How can I help You?");
//                    document.getElementById("msg").innerHTML = check_msg
//
//                    console.log(check_msg);
//                    var msg = new SpeechSynthesisUtterance(check_msg);
//
//                    msg.volume = 0.5
//                    window.speechSynthesis.speak(msg);
//
//
//
//}
//
//   });
}















