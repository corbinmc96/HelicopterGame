#pragma strict

var buttonStyle : GUIStyle;

function OnGUI () {
	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-100,150,50),"PLAY",buttonStyle)) {
		Application.LoadLevel("Main");
	}
	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+50,150,50),"EXIT",buttonStyle)) {
		Application.Quit();
	}
}