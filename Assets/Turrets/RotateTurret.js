#pragma strict

var speed : float = 30;
var targetName : String;
private var target : GameObject;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
}

function Update () {
	if (!Pause.isPaused) {
		var directionVector:Vector3 = target.transform.position - transform.position;
		directionVector.y = 0;
		var targetRotation:Quaternion = Quaternion.LookRotation(directionVector);
		transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed*Time.deltaTime);
	}
}