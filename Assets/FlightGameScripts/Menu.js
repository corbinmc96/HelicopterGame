#pragma strict

var mainMenuStyle : GUIStyle;
var upgradeMenuStyle : GUIStyle;
var whichMenu : String = "main";

//button textures
var playText : Texture2D;
var upgradeText : Texture2D;
var rocketsText : Texture2D;
var rocketDamageText : Texture2D;
var bulletDamageText : Texture2D;
var armorText : Texture2D;
//var playText : Texture2D;

function OnGUI () {
    if (whichMenu == "main") {
    	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-100,150,50),playText)) {
    		Application.LoadLevel("Main");
    	} if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-25,150,50),upgradeText)) {
    		whichMenu = "upgrade";
    	} if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+50,150,50),"EXIT",mainMenuStyle)) {
    		Application.Quit();
    	}
    } if (whichMenu == "upgrade") {
        if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-137.5,150,50),rocketsText) && enoughMoney()) {
            PlayerPrefs.SetInt("Rockets",PlayerPrefs.GetInt("Rockets",0)+10);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-62.5,150,50),rocketDamageText) && enoughMoney()) {
            PlayerPrefs.SetFloat("RocketDamage",PlayerPrefs.GetFloat("RocketDamage",0)+0.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+12.5,150,50),bulletDamageText) && enoughMoney()) {
            PlayerPrefs.SetFloat("BulletDamage",PlayerPrefs.GetFloat("BulletDamage",0)+0.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+87.5,150,50),armorText) && enoughMoney()) {
            PlayerPrefs.SetFloat("Armor",PlayerPrefs.GetFloat("Armor",100)+0.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+162.5,150,50),"Main Menu",upgradeMenuStyle)) {
            whichMenu = "main";    
        }
    }
}

function enoughMoney () {
    if (PlayerPrefs.GetInt("Money",0) >=500) {
        PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)-500);
        PlayerPrefs.Save();
        return true;
    } else {
        return false;
    }
}