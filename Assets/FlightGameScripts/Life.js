private var importHealth : int;
var myStyle : GUIStyle;
var helicopter : GameObject;
private var stringHealth : String;

function Start () {

}

function Update () {
	
}

function OnGUI () {
	importHealth = helicopter.GetComponent(Health).health;
	Debug.Log(importHealth);
	stringHealth = importHealth.ToString();
	GUI.Label(Rect(0,0,150,100),stringHealth+"%",myStyle);
}