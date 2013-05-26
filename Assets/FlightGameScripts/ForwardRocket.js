#pragma strict 

var rocketSpeed : int;

function Start () {
	
}

function Update () {
	if (!Pause.isPaused) {
		transform.Translate(Vector3.up*rocketSpeed*Time.deltaTime);
	}
}