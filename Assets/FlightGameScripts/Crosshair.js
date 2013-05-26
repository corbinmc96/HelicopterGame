#pragma strict

var crossImage : Texture2D;
var size : int;
private var boxSize : int;
private var imageArea : Rect;


function Update () {
	if (!Pause.isPaused) {
		boxSize = size*60/camera.fieldOfView;
    	imageArea = Rect((Screen.width-boxSize)/2,(Screen.height-boxSize)/2,boxSize,boxSize);
	}
}

function OnGUI () {
    GUI.DrawTexture(imageArea,crossImage);
}