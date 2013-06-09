#pragma strict

var mainMenuStyle : GUIStyle;
var upgradeMenuStyle : GUIStyle;
var whichMenu : String = "main";

function OnGUI () {
    if (whichMenu == "main") {
    	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-100,150,50),"PLAY",mainMenuStyle)) {
    		Application.LoadLevel("Main");
    	} if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-25,150,50),"UPGRADE",mainMenuStyle)) {
    		whichMenu = "upgrade";
    	}
    	if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+50,150,50),"EXIT",mainMenuStyle)) {
    		Application.Quit();
    	}
    } if (whichMenu == "upgrade") {
        if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-137.5,150,50),"Max Rockets",upgradeMenuStyle && enoughMoney()) {
            PlayerPrefs.SetInt("Rockets",PlayerPrefs.GetInt("Rockets",0));
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2-62.5,150,50),"Rocket Damage",upgradeMenuStyle && enoughMoney()) {
            PlayerPrefs.SetFloat("RocketDamage",PlayerPrefs.GetFloat("RocketDamage",0)*1.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+12.5,150,50),"Bullet Damage",upgradeMenuStyle && enoughMoney()) {
            PlayerPrefs.SetFloat("BulletDamage",PlayerPrefs.GetFloat("BulletDamage",0)*1.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+87.5,150,50),"Armor",upgradeMenuStyle && enoughMoney()) {
            PlayerPrefs.SetFloat("Armor",PlayerPrefs.GetFloat("Armor",0)*1.2);
            PlayerPrefs.Save();
        } else if (GUI.Button(Rect(Screen.width/2-75,Screen.height/2+162.5,150,50),"Main Menu",upgradeMenuStyle) {
            whichMenu = "main";    
        }
    }
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