#pragma strict

var health : float= 100;
var explosionPosition : Transform;
var explosion1 : GameObject;
var explosion2 : GameObject;

function Start () {
	if (!explosionPosition) {
		explosionPosition = transform;
	}
}

function Update () {
	if (!Pause.isPaused) {
		if (health <= 0) {
			Dead();
		}
	}
}

function Dead () {
	// add to number of tanks destroyed
	yield WaitForSeconds(0.2);
	Instantiate(explosion1, explosionPosition.position, transform.rotation);
	yield WaitForSeconds(0.5);
	Instantiate(explosion2, explosionPosition.position, transform.rotation);
	if (transform.Find("TurretBase")) {
		transform.Find("TurretBase").parent = null;
	}
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled+=1;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft-=1;
}