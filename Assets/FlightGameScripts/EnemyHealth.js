#pragma strict

var health : float= 100;
var explosionPosition : Transform;
var explosion2Position : Transform;
var explosion1 : GameObject;
var explosion2 : GameObject;

function Start () {
	if (!explosionPosition) {
		explosionPosition = transform;
	}
	if (!explosion2Position) {
		explosion2Position = explosionPosition;
	}
}

function Update () {
	if (health <= 0) {
		Dead();
	}
}


function Dead () {
	// add to number of tanks destroyed
	yield WaitForSeconds(0.2);
	Instantiate(explosion1, explosionPosition.position, transform.rotation);
	yield WaitForSeconds(0.5);
	Instantiate(explosion2, explosion2Position.position, transform.rotation);
	if (transform.Find("TurretBase")) {
		transform.Find("TurretBase").parent = null;
	}
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled++;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft--;
}