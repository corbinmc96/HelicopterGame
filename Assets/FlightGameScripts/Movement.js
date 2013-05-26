#pragma strict

var MoveSpeed : int;
var initialLookSpeed : float;
private var LookSpeed : float;
var ElevationSpeed : int;
var MaxTilt : int = 30;
private var burst : int;
var mainCamera : GameObject;


function Start () {
	//transform.position = Vector3(0,100,0);
}

function Update () {
	if (!Pause.isPaused) {
	LookSpeed= initialLookSpeed*mainCamera.camera.fieldOfView/60;
	if (Input.GetAxis("X")) {
		burst = 3;
	}
	else {
		burst = 1;
	}
	var noRiseVector = transform.forward;
	noRiseVector.y = 0;
	transform.Translate(Vector3.up * Input.GetAxis("Triggers") * ElevationSpeed * burst , Space.World);
	transform.Translate(Vector3.right * Input.GetAxis("Left X") * MoveSpeed * burst);
	transform.Translate(noRiseVector * Input.GetAxis("Left Y") * MoveSpeed * burst , Space.World);
	transform.Rotate(Vector3.up * Input.GetAxis("Right X") * LookSpeed);
	transform.Rotate(Vector3.right * Input.GetAxis("Right Y") * LookSpeed);	
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
}}

function OnCollisionEnter (myCollision : Collision) {
}