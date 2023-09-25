song = "";
song2 = "";
rightWristY = 0;
leftWristY = 0;
rightWristX = 0;
leftWristX = 0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(800, 700);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(800, 900);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet is initiated');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#dd3300');
    stroke('#dd3300');
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("song-display").innerHTML = "weird song";
        song2.play();
        song.stop();
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY);
        InNumberrightWristY = Number(rightWristY);
        remove_decimals = floor(InNumberrightWristY);
        volume = remove_decimals / 500;
        document.getElementById("song-display").innerHTML = "Harry Potter";
        song.play();
        song2.stop();
    }
}
function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        rightWristY = results[0].pose.rightWrist.y;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.x;
        console.log("leftwristX = " + leftWristX + " leftwristY = "+ leftWristY);
        console.log("rightwristX = " + rightWristX + " rightwristY = "+ rightWristY);
    }
}