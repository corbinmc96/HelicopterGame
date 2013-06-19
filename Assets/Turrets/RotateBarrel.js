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

private var target : GameObject;
private var fireIndex : int = 0;
private var shotTime : float = 0;
private var mainFirePoint:Transform;
private var bulletSpeed:float;
//private var HElevationSpeed:float;
//private var HMoveSpeed:float;
private var lastTargetPosition:Vector3;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
	mainFirePoint = transform.Find("FirePoint");
	bulletSpeed = gameObject.GetComponent(RotateBarrel).bulletObject.GetComponent(Ball).speed;
	//HElevationSpeed = GameObject.Find(targetName).GetComponent(Movement).ElevationSpeed;
	//HMoveSpeed = GameObject.Find(targetName).GetComponent(Movement).MoveSpeed;
	lastTargetPosition = GameObject.Find(targetName).transform.position;
}

function Update () {
	var targetForwardNoRise:Vector3 = target.transform.forward;
	targetForwardNoRise.y = 0;
	
	var T:Vector3 = transform.position;
	var H:Vector3 = target.transform.position;
	var d:float = (T - mainFirePoint.position).magnitude;
	var s:float = bulletSpeed;
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
	
	var directionVector:Vector3 = aimPoint - transform.position;
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