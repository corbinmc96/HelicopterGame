#pragma strict

private var startTime : float;
var texture : Texture2D;

function Start () {
	startTime = Time.time;
}

function Update () {
	if (Time.time - startTime > 4) {
		Application.LoadLevel("Credits");
	}
}

function OnGUI () {
	GUI.depth = 0;
	GUI.color = Color.white;
	GUI.color.a = Mathf.Lerp(0, 1, (Time.time - startTime)/3);
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), texture);
}