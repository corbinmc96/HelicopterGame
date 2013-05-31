#pragma strict
var begin : Vector3;
var dir : Vector3;
function Start () {
	begin=Vector3.zero;
	WaitForSeconds(1);
	begin=Input.acceleration;
}

function Update () {
	Debug.Log(Input.gyro.rotationRate);
}