#pragma strict

private var lastPress: float;
static var isPaused = false;
private var canPause : boolean;
private var pauseText : String;
var myStyle : GUIStyle;

function Start () {
	Time.timeScale = 1;
	lastPress = 0;
	canPause = true;
}

function Update () {
	if (canPause) {
		if (Input.GetButton("Start")) {
			canPause = false;
			isPaused = !isPaused;
			if (Time.timeScale==1) {
				Time.timeScale=0;
			} else {
				Time.timeScale=1;
			}
			canPause = true;
		}
	}
}

function OnGUI () {
	if (isPaused) {
		pauseText = "Paused";
	} else {
		pauseText ='';
	}
	GUI.Label(Rect(-75,-75/2.0,150,75),pauseText,myStyle);
}