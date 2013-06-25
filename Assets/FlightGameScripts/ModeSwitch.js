#pragma strict

function OnGUI () {
	if (Event.current.isKey) {
		if (Application.loadedLevelName == "Main" || Application.loadedLevelName == "SurvivalMode"){
			GameObject.Find("ControlHub").GetComponent(TS).enabled = false;
			GameObject.Find("APACHE_L").GetComponent(HeliShootTS).enabled = false;
			GameObject.Find("APACHE_L").GetComponent(MovementTS).enabled = false;
			GameObject.Find("APACHE_L").GetComponent(HeliShoot).enabled = true;
			GameObject.Find("APACHE_L").GetComponent(Movement).enabled = true;
		}
		else {
			GameObject.Find("ControlHub").GetComponent(MenuTS).enabled = false;
			GameObject.Find("ControlHub").GetComponent(Menu).enabled = true;
		}
	}
}