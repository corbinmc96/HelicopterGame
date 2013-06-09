#pragma strict

var initialHealth : int = 5;
var health : float;
var explosionPosition : Transform;
var explosion1 : GameObject;
var explosion2 : GameObject;
private var dead:boolean = false;

function Start () {
	health = initialHealth;
	if (!explosionPosition) {
		explosionPosition = transform;
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
	var expl1:GameObject = Instantiate(explosion1, explosionPosition.position, transform.rotation);
	expl1.transform.parent = transform.parent;
	yield WaitForSeconds(0.5);
	var expl2:GameObject = Instantiate(explosion2, explosionPosition.position, transform.rotation);
	expl2.transform.parent = transform.parent;
	
	Destroy(gameObject);
}