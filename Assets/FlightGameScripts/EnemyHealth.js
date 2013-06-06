#pragma strict

var initialHealth : int = 100;
var health : float;
var explosionPosition : Transform;
var explosion1 : GameObject;
var explosion2 : GameObject;

function Start () {
	health = initialHealth;
	if (!explosionPosition) {
		explosionPosition = transform;
	}
}

function Update () {
	if (health <= 0) {
		Dead();
	}
}


function Dead () {
	PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money",0)+initialHealth);
	yield WaitForSeconds(0.2);
	Instantiate(explosion1, explosionPosition.position, transform.rotation);
	yield WaitForSeconds(0.5);
	
	// var allTransforms = GetComponentsInChildren(Transform);
	// for (var child:Transform in allTransforms) {
		// if (child.name != gameObject.name) {
			// child.gameObject.AddComponent("Rigidbody");
			// child.gameObject.rigidbody.useGravity = true;
			// child.gameObject.rigidbody.isKinematic = false;
			// child.gameObject.rigidbody.mass *= 100;
			// child.gameObject.rigidbody.drag = 2;
			// child.gameObject.rigidbody.angularDrag = 0.2;
			// child.gameObject.AddComponent("BoxCollider");
			// //child.gameObject.GetComponent(SphereCollider).radius *= 0.1;
		// }
	// }
	// transform.DetachChildren();

	Instantiate(explosion2, explosionPosition.position, transform.rotation);
	if (transform.Find("TurretBase")) {
		transform.Find("TurretBase").parent = null;
	}
	Destroy(gameObject);
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesKilled++;
	GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft--;
}