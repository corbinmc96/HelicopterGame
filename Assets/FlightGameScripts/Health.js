#pragma strict

var health : float;
var displayHealth : int;
var explosion:GameObject;

function Start () {
	var health = 100;
}

function Update () {
	var displayHealth = Mathf.Ceil(health);
	if (health <= 0) {
		health =0;
		Dead();
	}
}

function OnCollisionEnter (theCrash : Collision) {
	if ((theCrash.gameObject.tag == "Enemy") || (theCrash.gameObject.name == "Lava") || (theCrash.gameObject.name == "Terrain")) {
		//health = 0;
	}
}

function Dead () {
	for (var child:Transform in transform) {
		if (child.name != "Main Camera" && child.name != "Target Point") {
			child.gameObject.AddComponent("Rigidbody");
			child.gameObject.rigidbody.useGravity = true;
			child.gameObject.rigidbody.isKinematic = false;
			child.gameObject.rigidbody.drag = 2;
			child.gameObject.rigidbody.angularDrag = 1;
			child.gameObject.AddComponent("SphereCollider");
			child.gameObject.GetComponent(SphereCollider).radius *= 0.1;
		}
	}
	transform.DetachChildren();
	Instantiate(explosion, transform.position, transform.rotation);
	GameObject.Find("ControlHub").GetComponent(FadeOut).enabled = true;
	gameObject.GetComponent(Movement).enabled = false;
	gameObject.GetComponent(RocketLaunch).enabled = false;
	gameObject.GetComponent(Health).enabled = false;
}
