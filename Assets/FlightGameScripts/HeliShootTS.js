var mainCamera : GameObject;
var helicopter : GameObject;
var rocket : GameObject;
var bullet : GameObject;
var rocketDelay : int = 1;
var shotDelay : float = 0.10;
var rocketCapacity : int;
static var rocketsLeft : int;
private var lastShot : float;
private var lastMissile : float;
private var shotDirection : int = 1;


function Start () {
	rocketCapacity = PlayerPrefs.GetInt("Rockets",0);
	rocketsLeft = rocketCapacity;
	lastMissile = Time.time - rocketDelay;
	lastShot = Time.time - shotDelay;
}

function Update () {
	if (TS.rocket==1) {
		if (rocketsLeft>0) {
			if (Time.time - rocketDelay >= lastMissile) {
				Instantiate (rocket,helicopter.transform.position+helicopter.transform.TransformDirection(shotDirection*5,-6.4,-22),mainCamera.transform.rotation);
				lastMissile= Time.time;
				rocketsLeft-=1;
				shotDirection *= -1;
			}
		}
	}
	if (TS.gun==1) {
		if (Time.time - shotDelay >= lastShot) {
			Instantiate (bullet, helicopter.transform.position+helicopter.transform.TransformDirection(0,-7.7,-19), mainCamera.transform.rotation);
			lastShot = Time.time;
		}
	}
}

function OnTriggerEnter (theCollider : Collider) {
	if (theCollider.gameObject.name=="Station") {
		rocketsLeft=rocketCapacity;
	}
}