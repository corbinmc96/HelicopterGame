#pragma strict

var initialHealth : int = 100;
var health : float;
var explosionPosition : Transform;
var explosion2Position : Transform;
var explosion1 : GameObject;
var explosion2 : GameObject;
private var dead:boolean = false;

function Start () {
	health = initialHealth;
	if (!explosionPosition) {
		explosionPosition = transform;
	}
	if (!explosion2Position) {
		explosion2Position = explosionPosition;
	}

}

function Update () {
	if (!dead && health <= 0) {
		dead = true;
		Dead();
	}
}


function Dead () {
	PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)+initialHealth);
	
	yield WaitForSeconds(0.2);
	Instantiate(explosion1, explosionPosition.position, explosionPosition.rotation);
	yield WaitForSeconds(0.8);
	Instantiate(explosion2, explosion2Position.position, explosion2Position.rotation);
	
	if (transform.Find("TurretBase")) {
		transform.Find("TurretBase").parent = null;
	}
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled++;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft--;
}