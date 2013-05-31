#pragma strict

private var startTime : float;
private var elapseTime : float;
var myStyle : GUIStyle;

function Start () {
	startTime = Time.time;
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
	GUI.Label(Rect(Screen.width-150,0,150,100),stringClock,myStyle);
}

// attatch to empty gameobject ControlHub