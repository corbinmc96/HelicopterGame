#pragma strict

var speed : float = 15;
var lowerLimit : float = -5;
var upperLimit : float = 45;

var firingAngle : float = 20;
var firingDistance : float = 300;
var shotDelay : float = 2;

var targetName : String;
var fireEffect : GameObject;
var bulletObject : GameObject;
var firePoints : Transform[];

private var fireIndex : int = 0;
private var shotTime : float = 0;
private var target : GameObject;
//private var HElevationSpeed:float;
//private var HMoveSpeed:float;
private var lastTargetPosition:Vector3;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
	//HElevationSpeed = GameObject.Find(targetName).GetComponent(Movement).ElevationSpeed;
	//HMoveSpeed = GameObject.Find(targetName).GetComponent(Movement).MoveSpeed;
	lastTargetPosition = GameObject.Find(targetName).transform.position;
}

function Update () {
	var targetForwardNoRise:Vector3 = target.transform.forward;
	targetForwardNoRise.y = 0;
	
	var T:Vector3 = transform.position;
	var H:Vector3 = target.transform.position;
	var d:float = (T - transform.Find("FirePoint").position).magnitude;
	var s:float = transform.GetComponent(MoveGun).bulletObject.GetComponent(Ball).speed;
	//var v:Vector3 = Vector3.up*Input.GetAxis("Triggers")*HElevationSpeed + target.transform.right*Input.GetAxis("Left X")*HMoveSpeed + targetForwardNoRise*Input.GetAxis("Left Y")*HMoveSpeed;
	var v:Vector3 = 1/Time.deltaTime * (GameObject.Find(targetName).transform.position-lastTargetPosition);
	lastTargetPosition = GameObject.Find(targetName).transform.position;
	
	//s checks!
	//v checks!
	
	var a:float = Mathf.Pow(v.magnitude, 2) - Mathf.Pow(s, 2);
	var b:float = 2 * (Vector3.Dot(H, v) - Vector3.Dot(T, v) - s*d);
	var c:float = Mathf.Pow(H.magnitude, 2) + Mathf.Pow(T.magnitude, 2) - 2 * Vector3.Dot(H, T) - Mathf.Pow(d, 2);
	
	//var time1:float = (-b + Mathf.Sqrt(b*b - 4*a*c)) / (2*a);
	var time:float = (-b - Mathf.Sqrt(b*b - 4*a*c)) / (2*a);
	//Debug.Log(time1);
	//Debug.Log(time);
	
	var aimPoint:Vector3 = H + time*v;
	
	//aim
	var directionVector:Vector3 = aimPoint - transform.position;
	var angle:float = 90 - Vector3.Angle(transform.parent.parent.up, transform.forward);
	var targetAngle:float = 90 - Vector3.Angle(transform.parent.parent.up, directionVector);
	
	if ((lowerLimit < angle && targetAngle < angle) || (angle < upperLimit && angle < targetAngle)) {
		var targetRotation : Quaternion = Quaternion.LookRotation(Quaternion.AngleAxis(targetAngle, -transform.right) * transform.parent.forward, transform.parent.parent.up);
		transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed * Time.deltaTime);
	}
	
	//fire
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