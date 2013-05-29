#pragma strict

var speed : float = 15;
var lowerLimit : float = -5;
var upperLimit : float = 45;
var firingAngle : float = 20;
var firingDistance : float = 300;
var shotDelay : float = 2;
var targetName : String;
private var target : GameObject;
var fireEffect : GameObject;
var bulletObject : GameObject;
var firePoints : Transform[];
private var fireIndex : int = 0;
private var shotTime : float = 0;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
}

function Update () {
	var directionVector:Vector3 = target.transform.position - transform.position;
	var angle:float = Mathf.Asin(transform.forward.y / transform.forward.magnitude)*180/Mathf.PI;
	var targetAngle:float = Mathf.Asin(directionVector.y / directionVector.magnitude)*180/Mathf.PI;
	if ((lowerLimit < angle && targetAngle < angle) || (angle < upperLimit && angle < targetAngle)) {
		var targetRotation : Quaternion = Quaternion.LookRotation(Quaternion.AngleAxis(-targetAngle, transform.right) * Vector3(transform.forward.x, 0, transform.forward.z));
		transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed * Time.deltaTime);
	}
	
	if (Vector3.Angle(directionVector,transform.forward) < firingAngle && directionVector.magnitude < firingDistance && shotTime > shotDelay) {
		Instantiate(fireEffect, firePoints[fireIndex].position, firePoints[fireIndex].rotation);
		Instantiate(bulletObject, firePoints[fireIndex].position, firePoints[fireIndex].rotation);
		shotTime = 0;
		fireIndex++;
		if (fireIndex == firePoints.length) {
			fireIndex = 0;
		}
	} else {
		shotTime += Time.deltaTime;
	}
}