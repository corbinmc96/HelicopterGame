#pragma strict

function Start () {

}

function Update () {

}

//converts normal 2D Rect's to GUI rects
function zoneToGUI (zone : Rect) {
	var guiRect : Rect;
	guiRect.x=zone.x;
	guiRect.y=Screen.height-zone.y-zone.height;
	guiRect.height=zone.height;
	guiRect.width=zone.width;
}