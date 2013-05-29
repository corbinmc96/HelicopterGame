#pragma strict

var speed : float = 30;
var targetName : String;
private var target : GameObject;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
}

function Update () {
	var directionVector:Vector3 = target.transform.position - transform.position;
	var angle:float = Vector3.Angle(directionVector, transform.up);
	var directionVectorPoint:Vector3 = transform.position + directionVector.normalized;
	var upVectorPoint:Vector3 = transform.position + Mathf.Cos(angle/180*Mathf.PI) * transform.up;
	
	var lookVector:Vector3 = directionVectorPoint - upVectorPoint;
	
	var targetRotation:Quaternion = Quaternion.LookRotation(lookVector, transform.parent.up);
	transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed*Time.deltaTime);
}