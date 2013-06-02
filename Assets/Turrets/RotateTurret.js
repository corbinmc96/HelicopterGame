#pragma strict

var speed : float = 30;
var targetName : String;
private var target : GameObject;

private var firePoint : Transform;
private var barrelName:String = "Barrel";
private var bulletSpeed:float;
private var HElevationSpeed:float;
private var HMoveSpeed:float;

function Start () {
	if (!transform.Find(barrelName)) {
		barrelName += "1";
	}
	firePoint = transform.Find(barrelName).Find("FirePoint");
	target = GameObject.Find(targetName + "/Target Point");
	bulletSpeed = transform.Find(barrelName).gameObject.GetComponent(RotateBarrel).bulletObject.GetComponent(Ball).speed;
	HElevationSpeed = GameObject.Find(targetName).GetComponent(Movement).ElevationSpeed;
	HMoveSpeed = GameObject.Find(targetName).GetComponent(Movement).MoveSpeed;
}

function Update () {
	var targetForwardNoRise:Vector3 = target.transform.forward;
	targetForwardNoRise.y = 0;
	
	var T:Vector3 = transform.Find(barrelName).position;
	var H:Vector3 = target.transform.position;
	var d:float = (T - firePoint.position).magnitude;
	var s:float = bulletSpeed;
	var v:Vector3 = Vector3.up*Input.GetAxis("Triggers")*HElevationSpeed + target.transform.right*Input.GetAxis("Left X")*HMoveSpeed + targetForwardNoRise*Input.GetAxis("Left Y")*HMoveSpeed;
	
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
	directionVector.y = 0;
	var targetRotation:Quaternion = Quaternion.LookRotation(directionVector);
	transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed*Time.deltaTime);
}