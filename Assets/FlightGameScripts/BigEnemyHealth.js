#pragma strict
import System.Collections.Generic;

var initialHealth =100;
var health : float;
var explosionPositions : List.<Transform>;
var explosions : List.<GameObject>;
var timeDelays : List.<float>;
private var dead:boolean = false;

function Start () {
	health = initialHealth;
}

function Update () {
	if (dead) {
		transform.Translate(-10 * Vector3.up * Time.deltaTime, Space.World);
		transform.Rotate(transform.up, 5 * Time.deltaTime);
		transform.Rotate(transform.right, -6 * Time.deltaTime);
	} else if (health <= 0) {
		Dead();
	}
}

function Dead () {
	PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)+initialHealth);	
	var length:int = explosionPositions.Count;
	for (var i = 0; i<length; i++) {
		yield WaitForSeconds(timeDelays[i]);
		Instantiate(explosions[i], explosionPositions[i].position, explosionPositions[i].rotation);
	}
	dead = true;
	rigidbody.isKinematic = true;

	yield WaitForSeconds(timeDelays[length]);
	
	if (transform.Find("TurretBase")) {
		transform.Find("TurretBase").parent = null;
	}
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled++;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft--;
}