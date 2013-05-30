#pragma strict

private var lastPress: float;
static var isPaused = false;
private var pauseText : String;
var myStyle : GUIStyle;
private var allAudioSources : AudioSource[];

function Start () {
	Time.timeScale = 1;
	lastPress = 0;
}

function Update () {
	if (Input.GetButtonDown("Start")) {
		var allAudioSource = FindObjectsOfType(AudioSource) as AudioSource[];
		isPaused = !isPaused;
		if (Time.timeScale==1) {
			for (var i : AudioSource in allAudioSource) {
				i.Pause();
			}
			Time.timeScale=0;
		} else {
			for (var i : AudioSource in allAudioSource) {
				i.Play();
			}
			Time.timeScale=1;
		}
	}
}
