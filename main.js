var gesture_name = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+ data_uri + '">';
    })
}

console.log("ml5 version ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/COfk2MBRs/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
       console.log(results); 
       document.getElementById("result_gesture").innerHTML = results[0].label;
       gesture_name = results[0].label;
       speak();
       if(results[0].label == "Victory"){
        document.getElementById("update_gesture").innerHTML = "&#x270C;";
    }
    if(results[0].label == "Dislike"){
        document.getElementById("update_gesture").innerHTML = "&#128078;";
    }
    if(results[0].label == "Like"){
        document.getElementById("update_gesture").innerHTML = "&#128077;";
    }
    if(results[0].label == "Call me"){
        document.getElementById("update_gesture").innerHTML = "&#9994;";
    }
    if(results[0].label == "OK"){
        document.getElementById("update_gesture").innerHTML = "&#9996;";
    }
    if(results[0].label == "Swag"){
        document.getElementById("update_gesture").innerHTML = "&#128070;";
    }
    }
}
function speak(){
    synth = window.speechSynthesis;
    speak_data = "The gesture is" + gesture_name
    utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}