#pragma strict

var moneyStyle : GUIStyle;

function OnGUI () {
	GUI.Label(Rect(Screen.width-150,0,150,100),"$"+PlayerPrefs.GetInt("Money",0),moneyStyle);
}