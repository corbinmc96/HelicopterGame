#pragma strict

private var theNumber : float;
var myStyle : GUIStyle ;

function Start () {
	theNumber = Random.value;
	WaitForSeconds(5);
	myStyle.fontSize = 30/*Screen.height/1000*/;
}

function OnGUI () {
	if (theNumber>=.5) {
		GUI.Label(Rect(0,0,Screen.width,Screen.height),"Developed by\nCorbin McNeill\nAaron Miller",myStyle);
	} else {
		GUI.Label(Rect(0,0,Screen.width,Screen.height),"Developed by\nAaron Miller\nCorbin McNeill",myStyle);
	}
}