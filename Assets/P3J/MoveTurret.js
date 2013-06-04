#pragma strict

var speed : float = 30;
var targetName : String;
var barrelName:String = "cannon";
private var target : GameObject;
private var HElevationSpeed:float;
private var HMoveSpeed:float;

function Start () {
	target = GameObject.Find(targetName + "/Target Point");
	HElevationSpeed = GameObject.Find(targetName).GetComponent(Movement).ElevationSpeed;
	HMoveSpeed = GameObject.Find(targetName).GetComponent(Movement).MoveSpeed;
}

function Update () {
	var targetForwardNoRise:Vector3 = target.transform.forward;
	targetForwardNoRise.y = 0;
	
	var T:Vector3 = transform.Find(barrelName).position;
	var H:Vector3 = target.transform.position;
	var d:float = (T - transform.Find(barrelName).Find("FirePoint").position).magnitude;
	var s:float = transform.Find(barrelName).GetComponent(MoveGun).bulletObject.GetComponent(Ball).speed;
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
	var angle:float = Vector3.Angle(directionVector, transform.up);
	var directionVectorPoint:Vector3 = transform.position + directionVector.normalized;
	var upVectorPoint:Vector3 = transform.position + Mathf.Cos(angle/180*Mathf.PI) * transform.up;
	
	var lookVector:Vector3 = directionVectorPoint - upVectorPoint;
	
	var targetRotation:Quaternion = Quaternion.LookRotation(lookVector, transform.parent.up);
	transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, speed*Time.deltaTime);
}