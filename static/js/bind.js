var data=[];









 $("#record").click(function(){

    //var a = document.getElementById('test1');
    console.log("sdadadasd");
    alert("Recording start");
    $("img").addClass("animate");
    document.getElementById("msg").innerHTML = "Authentication In Progress"


    $.ajax({
 method: "POST",
 url: "/chat",
datatype:"json",
data: { 'text':"abc",},
cache: false,
 success: function callbackFunc(jsondata) {

                if(jsondata["status"]=="success"){
                    response=jsondata["response"];
                    }




                    $("img").removeClass("animate");
                    var check_msg = "Hi ".concat(response).concat("! How can I help You?");
                    document.getElementById("msg").innerHTML = check_msg

                    console.log(check_msg);
                    var msg = new SpeechSynthesisUtterance(check_msg);

                    msg.volume = 0.5
                    window.speechSynthesis.speak(msg);



}

   });

   });

