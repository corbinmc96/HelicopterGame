#pragma strict

private var startTime : float;
private var elapseTime : float;
var myStyle : GUIStyle;

function Start () {
	startTime = Time.time;
	myStyle.fontSize = myStyle.fontSize *Screen.width/1000;
}

function OnGUI () {
	elapseTime = (Time.time - startTime);
	var minutes : int = Mathf.Floor(elapseTime/60);
	var seconds : int = Mathf.Floor(elapseTime-60*minutes);
	var secondsString : String;
	if (seconds <= 9) {
		secondsString="0"+seconds.ToString();
	}
	else {
		secondsString=seconds.ToString();
	}
	var stringClock = Array(minutes,":",secondsString).Join("");
	GUI.Label(Rect(Screen.width-(150*Screen.width/1000),60*Screen.width/1000,135*Screen.width/1000,75*Screen.width/1000),stringClock,myStyle);
}

// attatch to empty gameobject ControlHub