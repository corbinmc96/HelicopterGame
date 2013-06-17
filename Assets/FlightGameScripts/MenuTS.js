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

function Start () {
    zone1 = guiToZone(Rect(Screen.width/2-75,Screen.height/2-100,150,50));
    zone2 = guiToZone(Rect(Screen.width/2-75,Screen.height/2-25,150,50));
    zone3 = guiToZone(Rect(Screen.width/2-75,Screen.height/2+50,150,50));
    zone4 = guiToZone(Rect(Screen.width/2-75,Screen.height/2-137.5,150,50));
    zone5 = guiToZone(Rect(Screen.width/2-75,Screen.height/2-62.5,150,50));
    zone6 = guiToZone(Rect(Screen.width/2-75,Screen.height/2+12.5,150,50));
    zone7 = guiToZone(Rect(Screen.width/2-75,Screen.height/2+87.5,150,50));
    zone8 = guiToZone(Rect(Screen.width/2-75,Screen.height/2+162.5,150,50));
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
					PlayerPrefs.SetInt("Rockets",PlayerPrefs.GetInt("Rockets",0));
				} if (zone5.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("RocketDamage",PlayerPrefs.GetInt("RocketDamage",0));
				} if (zone6.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("BulletDamage",PlayerPrefs.GetInt("BulletDamage",0));
				} if (zone7.Contains(touch.position) && enoughMoney()) {
					PlayerPrefs.SetInt("Armor",PlayerPrefs.GetInt("Armor",0));
				} if (zone8.Contains(touch.position)) {
					whichMenu = "main";
				} 
			}
		} 
	}
}

function OnGUI () {
    if (whichMenu == "main") {
    	GUI.Button(Rect(Screen.width/2-75,Screen.height/2-100,150,50),"PLAY",mainMenuStyle);
    	GUI.Button(Rect(Screen.width/2-75,Screen.height/2-25,150,50),"UPGRADE",mainMenuStyle);
    	GUI.Button(Rect(Screen.width/2-75,Screen.height/2+50,150,50),"EXIT",mainMenuStyle);
    } if (whichMenu == "upgrade") {
        GUI.Button(Rect(Screen.width/2-75,Screen.height/2-137.5,150,50),"Max Rockets",upgradeMenuStyle);
        GUI.Button(Rect(Screen.width/2-75,Screen.height/2-62.5,150,50),"Rocket Damage",upgradeMenuStyle);
        GUI.Button(Rect(Screen.width/2-75,Screen.height/2+12.5,150,50),"Bullet Damage",upgradeMenuStyle);
        GUI.Button(Rect(Screen.width/2-75,Screen.height/2+87.5,150,50),"Armor",upgradeMenuStyle);
        GUI.Button(Rect(Screen.width/2-75,Screen.height/2+162.5,150,50),"Main Menu",upgradeMenuStyle);
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