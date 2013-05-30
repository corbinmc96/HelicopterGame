var mainCamera : GameObject;
var helicopter : GameObject;
var rocket : GameObject;
var bullet : GameObject;
var rocketDelay : int = 1;
var shotDelay : float = 0.10;
private var lastShot : float;
private var lastMissile : float;
private var shotDirection : int = 1;

var rocketCapacity : int;
static var rocketsLeft : int;


function Start () {
	lastMissile = Time.time - rocketDelay;
	lastShot = Time.time - shotDelay;
	rocketsLeft=rocketCapacity;
}

function Update () {
	if (!Pause.isPaused) {
	if (Input.GetAxis("L1")==1) {
		if (rocketsLeft!=0) {
			if (Time.time - rocketDelay >= lastMissile) {
				Instantiate (rocket,helicopter.transform.position+helicopter.transform.TransformDirection(shotDirection*5,-6.4,-22),mainCamera.transform.rotation);
				lastMissile= Time.time;
				rocketsLeft--;
				shotDirection *= -1;
			}
		}
	}
	if (Input.GetAxis("R1")==1) {
		if (Time.time - shotDelay >= lastShot) {
			Instantiate (bullet, helicopter.transform.position+helicopter.transform.TransformDirection(0,-7.7,-19), mainCamera.transform.rotation);
			lastShot = Time.time;
		}
	}
}}

function OnTriggerEnter (theCollider : Collider) {
	if (collider.gameObject.name=="Station") {
		rocketsLeft=rocketCapacity;
	}
}