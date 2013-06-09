#pragma strict 

var rocketSpeed : int;

function Start () {
	
}

function Update () {
	transform.Translate(Vector3.up*rocketSpeed*Time.deltaTime);
}