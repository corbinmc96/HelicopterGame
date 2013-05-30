#pragma strict

var screenDivisions : int = 35;
private var wPiece : float = Screen.width/screenDivisions;
private var hPiece : float = Screen.height/screenDivisions;

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
var enemyStyle:GUIStyle;

//pause test
private var pauseText : String;
var pauseStyle : GUIStyle;

function Start() {
	for (i in [enemyStyle,pauseStyle,lifeStyle]) {
		i.fontSize=i.fontSize*Screen.height/650;
	}
	size = size*Screen.height/1000;
	enemiesLeft=GameObject.FindGameObjectsWithTag("Enemy").length;
}

function Update () {
	//crosshair
	boxSize = size*60/mainCamera.camera.fieldOfView;
	imageArea = Rect((Screen.width-boxSize)/2,(Screen.height-boxSize)/2,boxSize,boxSize);
}


function OnGUI () {
	GUI.depth = 1;
    //crosshair
    if (!Pause.isPaused) {
    	GUI.DrawTexture(imageArea,crossImage);
    }
    
    //life %
    importHealth = helicopter.GetComponent(Health).health;
    if (importHealth<0) {
    	importHealth=0;
    }
	stringHealth = importHealth.ToString();
	GUI.Label(Rect(wPiece/2,hPiece,3*wPiece,3*hPiece),stringHealth+"%",lifeStyle);
	
	//Enemy count
	GUI.Label(Rect(wPiece/2,4*hPiece,wPiece,hPiece), "Enemies Killed: "+enemiesKilled.ToString(),enemyStyle);
	GUI.Label(Rect(wPiece/2,5*hPiece,wPiece,hPiece), "Enemies Left: "+enemiesLeft.ToString(),enemyStyle);
	if (enemiesLeft<=0) {
		GameObject.Find("ControlHub").GetComponent(FadeOut).enabled = true;
	}
	
	//Pause
	if (Pause.isPaused) {
		pauseText = "Paused";
	} else {
		pauseText ='';
	}
	GUI.Label(Rect(Screen.width/2-2*wPiece,Screen.height/2-2*hPiece,4*wPiece,4*hPiece),pauseText,pauseStyle);
	GUI.Label(Rect(wPiece/2,6*hPiece,wPiece,hPiece), "Rockets Left:  "+HeliShoot.rocketsLeft.ToString(),enemyStyle);
}