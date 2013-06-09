#pragma strict

var moneyStyle : GUIStyle;

function Start () {
	moneyStyle.fontSize = moneyStyle.fontSize * Screen.width/1000;
}

function OnGUI () {
	GUI.Label(Rect(Screen.width-(300*Screen.width/1000),0,285*Screen.width/1000,75*Screen.width/1000),"$"+PlayerPrefs.GetInt("Money",0),moneyStyle);
}