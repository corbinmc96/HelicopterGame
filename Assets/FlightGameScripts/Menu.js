#pragma strict

var buttonStyle : GUIStyle;

function OnGUI () {
	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-100,150,50),"PLAY")) {
		Application.LoadLevel("Main");
	}
}