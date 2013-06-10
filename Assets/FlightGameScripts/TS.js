#pragma strict

//ControlButtonSize
var cbs : int;
var button1 : Texture2D; //rocket
private var zone1 : Rect;
var button2 : Texture2D; //gun
private var zone2 : Rect;
var button3 : Texture2D; //down
private var zone3 : Rect;
var button4 : Texture2D; //up
private var zone4 : Rect;
private var stickZone : Rect;


//Input.acceletation
private var startAccel : Vector3;
private var relativeAccel : Vector3;
//Simulated controls
static var rightX : float;
static var rightY : float;
static var leftX : float;
static var leftY :float;
static var gun : int;
static var rocket : int;
static var elevate : int;
static var start : int;


function Start () {
	//records reference position of input.acceleration
	startAccel = Input.acceleration;
	//sets zone Areas
	zone1 = Rect(Screen.width-3*cbs,0,cbs,cbs);
	zone2 = Rect(Screen.width-1.5*cbs,0,cbs,cbs);
	zone3 = Rect(Screen.width-3*cbs,1.5*cbs,cbs,cbs);
	zone4 = Rect(Screen.width-1.5*cbs,1.5*cbs,cbs,cbs);
	stickZone = Rect(0,0,4*cbs,3*cbs);
}

function Update () {
	//sets all inputs to zero
	rocket = 0;
	gun = 0;
	elevate = 0;
	leftX = 0;
	leftY = 0;

	//for loop with all touches
	for (i in Input.touches) {
		//Excludes ending phase touches
		if (i.phase!=TouchPhase.Ended && i.phase!=TouchPhase.Canceled) {
			//test for simulated button1 touch
			if (zone1.Contains(i.position)) {
				//setting simulated rocket axis to 1
				rocket=1;
			}
			//test for simulated button2 touch
			if (zone2.Contains(i.position)) {
				//setting simulated gun axis to 1
				gun = 1;
			}
			//test for simulated button3 touch and that button 4 isn't being touched
			if (zone3.Contains(i.position) && elevate==0) {
				//setting simulated elevation axis
				elevate = -1;
			}
			//test for simulated button4 touch and that button 3 isn't being touched
			if (zone4.Contains(i.position) && elevate==0) {
				//setting simulated elevation axis
				elevate = 1;
			}
			//test for simulated joystick touch
			if (stickZone.Contains(i.position)) {
				leftX = -(i.position.x-1.5*cbs)/cbs;
				leftY = -(i.position.y-1.5*cbs)/cbs;
			}
		}
	}

	//Input.Acceleration to control right stick controls
	relativeAccel = Input.acceleration - startAccel;
	rightX = relativeAccel.x;
	rightY = relativeAccel.z;
}

function OnGUI () {
	//draw Button1
	GUI.DrawTexture(Rect(Screen.width-3*cbs,Screen.height-1.5*cbs,cbs,cbs),button1);
	//draw button2
	GUI.DrawTexture(Rect(Screen.width-1.5*cbs,Screen.height-1.5*cbs,cbs,cbs),button2);
	//draw button3
	GUI.DrawTexture(Rect(Screen.width-3*cbs,Screen.height-3*cbs,cbs,cbs),button3);
	//draw button4
	GUI.DrawTexture(Rect(Screen.width-1.5*cbs,Screen.height-3*cbs,cbs,cbs),button4);
}