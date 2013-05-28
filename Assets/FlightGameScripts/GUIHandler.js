#pragma strict
//crossharir
var crossImage : Texture2D;
var size : int;
private var boxSize : int;
private var imageArea : Rect;
var mainCamera : GameObject;

//life %
private var importHealth : int;
var lifeStyle : GUIStyle;
var helicopter : GameObject;
private var stringHealth : String;

//enemy count
var enemiesLeft : int;
var enemiesKilled: int = 0;

function Start() {
	enemiesLeft=GameObject.FindGameObjectsWithTag("Enemy").length;
}

function Update () {
	//crosshair
	if (!Pause.isPaused) {
		boxSize = size*60/mainCamera.camera.fieldOfView;
    	imageArea = Rect((Screen.width-boxSize)/2,(Screen.height-boxSize)/2,boxSize,boxSize);
	}
}

function OnGUI () {
	GUI.depth = 1;
    //crosshair
    GUI.DrawTexture(imageArea,crossImage);
    
    //life %
    importHealth = helicopter.GetComponent(Health).health;
	stringHealth = importHealth.ToString();
	GUI.Label(Rect(25,0,150,75),stringHealth+"%",lifeStyle);
}