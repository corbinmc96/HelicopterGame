#pragma strict

private var lastPress: float;
static var isPaused = false;

function Start () {
	Time.timeScale = 1;
	lastPress = 0;
}

function Update () {
	if (Input.GetButton("Start")) {
		isPaused = !isPaused;
		if (Time.timeScale==0) {
			Time.timeScale=1;
		} if (Time.timeScale==1) {
			Time.timeScale=0;
		}
	}
}
