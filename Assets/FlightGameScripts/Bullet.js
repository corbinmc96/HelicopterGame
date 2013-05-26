#pragma strict

var speed : float = 200;
var range : float = 400;

var ExploPtcl : GameObject;

var helicopterName : String;

private var dist : float;
private var mainCamera : GameObject;
private var launchTime : float;


function Start () {
	mainCamera = GameObject.Find(helicopterName + "/Main Camera");
	transform.LookAt(getPoint());
	transform.Rotate(0,0,0);
	launchTime = Time.time;
}

function Update () {
	if (!Pause.isPaused) {
		// Move Ball forward
		transform.Translate(Vector3.forward * Time.deltaTime * speed);
		
		// Record Distance.
		dist += Time.deltaTime * speed;
		
		// If reach to my range, Destroy. 
		if(dist >= range) {
			Destroy(gameObject);
		}
	}
}

function OnCollisionEnter(myCollision: Collision){
	// If hit something, Destroy.
	if (myCollision.gameObject.name != helicopterName) {
		Instantiate(ExploPtcl, transform.position, transform.rotation);
		Destroy(gameObject);
	}
}

function getPoint () {
	var hit : RaycastHit;
	if (Physics.Raycast(mainCamera.transform.position,mainCamera.transform.forward,hit)) {
		return hit.point;
	} else {
		return (mainCamera.transform.position + 200*(mainCamera.transform.forward));
	}
}

