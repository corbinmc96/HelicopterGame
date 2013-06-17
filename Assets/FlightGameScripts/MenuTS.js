#pragma strict

var mainMenuStyle : GUIStyle;
var upgradeMenuStyle : GUIStyle;

private var zone1 : Rect;
private var zone2 : Rect;
private var zone3 : Rect;
private var zone4 : Rect;
private var zone5 : Rect;
private var zone6 : Rect;
private var zone7 : Rect;
private var zone8 : Rect;
private var whichMenu : String = "main";

//button textures
var playText : Texture2D;
var upgradeText : Texture2D;
var rocketsText : Texture2D;
var rocketDamageText : Texture2D;
var bulletDamageText : Texture2D;
var armorText : Texture2D;
//var playText : Texture2D;

function Start () {
    zone1 = guiToZone(Rect(Screen.width/3,Screen.height/7,Screen.width/3,Screen.height/7+100));
    zone2 = guiToZone(Rect(Screen.width/3,Screen.height*3/7,Screen.width/3,Screen.height/7+100));
    zone3 = guiToZone(Rect(Screen.width/3,Screen.height*5/7,Screen.width/3,Screen.height/7+100));
    zone4 = guiToZone(Rect(Screen.width/9,Screen.height/7,Screen.width/3,Screen.width/7));
    zone5 = guiToZone(Rect(Screen.width*5/9,Screen.height/7,Screen.width/3,Screen.width/7));
    zone6 = guiToZone(Rect(Screen.width/9,Screen.height*3/7,Screen.width/3,Screen.width/7));
    zone7 = guiToZone(Rect(Screen.width*5/9,Screen.height*3/7,Screen.width/3,Screen.width/7));
    zone8 = guiToZone(Rect(Screen.width/3,Screen.height*5/7,Screen.width/3,Screen.width/7));
}

function Update () {
	if (Input.touchCount == 1) {
		var touch = Input.touches[0];
		if (touch.phase==TouchPhase.Began) {
			if (whichMenu == "main") {
				if (zone1.Contains(touch.position)) {
					Application.LoadLevel("Main");
				} if (zone2.Contains(touch.position)) {
					whichMenu = "upgrade";
				} if (zone3.Contains(touch.position)) {
					Application.Quit();
				}
			} if (whichMenu =="upgrade") {
				if (zone4.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("Rockets",PlayerPrefs.GetInt("Rockets",0)+10);
				} if (zone5.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("RocketDamage",PlayerPrefs.GetInt("RocketDamage",1)+0.2);
				} if (zone6.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("BulletDamage",PlayerPrefs.GetInt("BulletDamage",1)+0.2);
				} if (zone7.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("Armor",PlayerPrefs.GetInt("Armor",100)+20);
				} if (zone8.Contains(touch.position)) {
					whichMenu = "main";
				} 
			}
		} 
	}
}

function OnGUI () {
    if (whichMenu == "main") {
    	GUI.Label(Rect(Screen.width/3,Screen.height/7,Screen.width/3,Screen.height/7+100),playText);
    	GUI.Label(Rect(Screen.width/3,Screen.height*3/7,Screen.width/3,Screen.height/7+100),upgradeText);
    	GUI.Label(Rect(Screen.width/3,Screen.height*5/7,Screen.width/3,Screen.height/7+100),"EXIT",mainMenuStyle);
    } if (whichMenu == "upgrade") {
        GUI.Label(Rect(Screen.width/9,Screen.height/7,Screen.width/3,Screen.width/7),rocketsText);
        GUI.Label(Rect(Screen.width*5/9,Screen.height/7,Screen.width/3,Screen.width/7),rocketDamageText);
        GUI.Label(Rect(Screen.width/9,Screen.height*3/7,Screen.width/3,Screen.width/7),bulletDamageText);
        GUI.Label(Rect(Screen.width*5/9,Screen.height*3/7,Screen.width/3,Screen.width/7),armorText);
        GUI.Label(Rect(Screen.width/3,Screen.height*5/7,Screen.width/3,Screen.width/7),"Main Menu",upgradeMenuStyle);
    }
}

//converts GUI Rects to normal 2D Rects
function guiToZone (guiRect : Rect) {
	var zone : Rect;
	zone.x=guiRect.x;
	zone.y=Screen.height-guiRect.y-guiRect.height;
	zone.height=guiRect.height;
	zone.width=guiRect.width;
	return zone;
}

function enoughMoney () {
    if (PlayerPrefs.GetInt("Money",0) >=5000) {
        PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)-5000);
        PlayerPrefs.Save();
        return true;
    } else {
        return false;
    }
}