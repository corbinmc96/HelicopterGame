#pragma strict

//FireButtonSize
var fbs : int;
var button1 : Texture2D;
private var zone1 : Rect;
var button2 : Texture2D;
private var zone2 : Rect;

//Input.Acceleration
private var startAccel : Vector3;
private var relativeAccel : Vector3;
//simulated controls
static var rightX : float;
static var rightY : float;
static var r1 : int;
static var l1 : int;


function Start () {
	//records reference position of input.acceleration
	startAccel = Input.acceleration;
	//sets zone Areas
	zone1 = Rect(Screen.width-3*fbs,0,fbs,fbs);
	zone2 = Rect(Screen.width-1.5*fbs,0,fbs,fbs);

}

function Update () {
	//sets all inputs to zero
	r1=0;
	//for loop with all touches
	for (i in Input.touches) {
		//Excludes ending phase touches
		if (i.phase!=TouchPhase.Ended && i.phase!=TouchPhase.Canceled) {
			//test for simulated button2 touch
			if (zone2.Contains(i.position)) {
				//setting simulated r1 axis to 1
				r1=1;
			}
		}
	}
}

function OnGUI () {
	//draw Button1
	GUI.DrawTexture(Rect(Screen.width-3*fbs,Screen.height-1.5*fbs,fbs,fbs),button1);
	//draw button2
	GUI.DrawTexture(Rect(Screen.width-1.5*fbs,Screen.height-1.5*fbs,fbs,fbs),button2);
}