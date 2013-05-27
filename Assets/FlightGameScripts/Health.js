#pragma strict

var health : float;
var displayHealth : int;
var explosion : GameObject;

function Start () {
	var health = 100;
}

function Update () {
	if (!Pause.isPaused) {
		var displayHealth = Mathf.Ceil(health);
		if (health <= 0) {
			Dead();
		}
	}
}

function OnCollisionEnter (theCrash : Collision) {
	if ((theCrash.gameObject.tag == "Enemy") || (theCrash.gameObject.name == "Lava") || (theCrash.gameObject.name == "Terrain")) {
		health = 0;
	}
}

function Dead () {
	Instantiate(explosion, transform.position, transform.rotation);
	GameObject.Find("ControlHub").GetComponent(FadeOut).enabled = true;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enabled = false;
	gameObject.GetComponent(Movement).enabled = false;
	gameObject.GetComponent(Health).enabled = false;
}
//code