#pragma strict

var MoveSpeed : int;
var initialLookSpeed : float;
private var LookSpeed : float;
var ElevationSpeed : int;
var MaxTilt : int = 30;
var mainCamera : GameObject;


function Start () {
	//transform.position = Vector3(0,100,0);
}

function Update () {
	LookSpeed= initialLookSpeed*mainCamera.camera.fieldOfView/60;
	var noRiseVector = transform.forward;
	noRiseVector.y = 0;
	transform.Translate(Vector3.up * TS.elevate * ElevationSpeed * Time.deltaTime, Space.World);
	transform.Translate(Vector3.right * TS.leftX * MoveSpeed * Time.deltaTime);
	transform.Translate(noRiseVector * TS.leftY * MoveSpeed * Time.deltaTime, Space.World);
	transform.Rotate(Vector3.up * TS.rightX * LookSpeed * Time.deltaTime);
	transform.Rotate(Vector3.right * TS.rightY * LookSpeed * Time.deltaTime);	
	transform.eulerAngles.z = 0;
	if (transform.eulerAngles.x > MaxTilt && transform.eulerAngles.x < 340 - MaxTilt) {
		transform.eulerAngles.x = MaxTilt;
	}
	if (transform.eulerAngles.x < 360 - MaxTilt && transform.eulerAngles.x > MaxTilt+20) {
		transform.eulerAngles.x = 360-MaxTilt;
	}
	if (transform.position.y > 450) {
		transform.position.y = 450;
	}
	if (transform.position.z > 8000) {
		transform.position.z = 8000;
	}
	if (transform.position.z < 0) {
		transform.position.z = 0;
	}
	if (transform.position.x > 8000) {
		transform.position.x = 8000;
	}
	if (transform.position.x < 0) {
		transform.position.x = 0;
	}
	if (Input.GetAxis("Square") == 1 || Input.GetAxis("L3") == 1){
		transform.eulerAngles.x = 0;
	}
	//if (Input.GetAxis("Up") == 1) {
		//transform.eulerAngles.x = MaxTilt;
	//}
	//if (Input.GetAxis("Down") == 1) {
		//transform.eulerAngles.x = 360-MaxTilt;
	//}
}

function OnCollisionEnter (myCollision : Collision) {
}