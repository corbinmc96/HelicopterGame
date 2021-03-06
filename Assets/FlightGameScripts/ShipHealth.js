#pragma strict
import System.Collections.Generic;

var initialHealth = 100;
var health : float;
var explosionPositions : List.<Transform>;
var explosions : List.<GameObject>;
var timeDelays : List.<float>;
private var deadTime:float = 0;

function Start () {
	health = initialHealth;
}

function Update () {
	if (deadTime) {
		transform.Translate(-10 * Vector3.up * Time.deltaTime, Space.World);
		transform.Rotate(Vector3.up, 5 * Time.deltaTime);
		transform.Rotate(Vector3.right, -5 * Time.deltaTime * Mathf.Pow(0.9, Time.time - deadTime));
	} else if (health <= 0) {
		deadTime = Time.time;
		Dead();
	}
}

function Dead () {
	PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)+initialHealth);
	rigidbody.isKinematic = true;

	var length:int = explosionPositions.Count;
	for (var i = 0; i<length; i++) {
		yield WaitForSeconds(timeDelays[i]);
		Instantiate(explosions[i], explosionPositions[i].position, explosionPositions[i].rotation);
	}

	yield WaitForSeconds(timeDelays[length]);
	
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled++;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft--;

}