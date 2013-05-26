var mainCamera : GameObject;
var rocket : GameObject;
var rocketDelay : int = 1;
private var lastShot : float;


function Start () {
	lastShot=Time.time;
}

function Update () {
	if (!Pause.isPaused) {
	if (Input.GetAxis("R1")==1) {
		if (Time.time - rocketDelay >= lastShot) {
			Instantiate (rocket,mainCamera.transform.position,mainCamera.transform.rotation);
			lastShot= Time.time;
		}
	}
}}

function AimVector () {
	var hit : RaycastHit;
	var ray : Vector3 = mainCamera.transform.forward;
	var CameraLocation : Vector3 = mainCamera.transform.position;
	if (Physics.Raycast(CameraLocation,ray, hit)) {
		return (hit.point-transform.position);
	}
}