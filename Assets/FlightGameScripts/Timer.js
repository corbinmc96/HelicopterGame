#pragma strict

private var startTime : float;
private var elapseTime : float;
var myStyle : GUIStyle;

function Start () {
	startTime = Time.time;
}

function OnGUI () {
	elapseTime = (Time.time - startTime)/20.0;
	var minutes : int = Mathf.Floor(elapseTime/60);
	var seconds : int = (elapseTime%60);
	var decimal : String = Mathf.Floor((elapseTime%1)*100).ToString();
	if (decimal.length == 1) {
		decimal = "0"+decimal;
	}
	var stringClock = Array(minutes,":",seconds,".",decimal).Join("");
	GUI.Label (Rect(Screen.height-180,Screen.width-130,150,100),stringClock,myStyle);
}

// attatch to empty gameobject ControlHub