var data=[];









 $("#record").click(function(){

    //var a = document.getElementById('test1');
    console.log("sdadadasd");
    alert("Recording start");
    $("img").addClass("animate");
    document.getElementById("msg").innerHTML = "Authentication In Progress"


//    $.post("/chat",
//            {
//                //csrfmiddlewaretoken:csrf,
//                text:a.value,
//            },
//            function(jsondata){
//            alert(jsondata);
//                if(jsondata["status"]=="success"){
//                    response=jsondata["response"];
//
//                    alert(response);}
//                }
//            });

    $.ajax({
 method: "POST",
 url: "/chat",
datatype:"json",
data: { 'text':"abc",},
cache: false,
 success: function callbackFunc(jsondata) {

                if(jsondata["status"]=="success"){
                    response=jsondata["response"];
//                    alert(String(response));
                    }




                    $("img").removeClass("animate");
                    var check_msg = "Hi ".concat(response).concat("! How can I help You?");
                    document.getElementById("msg").innerHTML = check_msg
//                    var child = document.getElementById("p1");
//                    element.insertBefore(para,child);

                    console.log(check_msg);
                    var msg = new SpeechSynthesisUtterance(check_msg);
//                    var voices = window.speechSynthesis.getVoices();
//                    msg.voice = voices[6]
                    msg.volume = 0.5
                    window.speechSynthesis.speak(msg);



}

   });

   });

