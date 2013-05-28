#pragma strict 

var rocketSpeed : int;
var explosion : GameObject;
var helicopterName : String;
private var mainCamera : GameObject;
private var launchTime : float;

function Start () {
	mainCamera = GameObject.Find(helicopterName + "/Main Camera");
	transform.LookAt(getPoint());
	transform.Rotate(0,-90,0);
	launchTime = Time.time;
}

function Update () {
	if (!Pause.isPaused) {
	transform.Translate(Vector3.right*rocketSpeed*Time.deltaTime);
	if (Time.time - launchTime > 3) {
		GameObject.Find(gameObject.name+"/Flame/InnerCore").particleEmitter.emit = false;
		GameObject.Find(gameObject.name+"/Flame/OuterCore").particleEmitter.emit = false;
		GameObject.Find(gameObject.name+"/Flame/Smoke").particleEmitter.emit = false;
		
		gameObject.rigidbody.useGravity = true;	
	}
	if (Time.time - launchTime > 5.5) {
		Instantiate(explosion, transform.position, transform.rotation);
		
		Destroy(GameObject.Find(gameObject.name+"/Flame"),10);
		transform.DetachChildren();
		Destroy(gameObject);
	}
}}

function getPoint () {
	var hit : RaycastHit;
	if (Physics.Raycast(mainCamera.transform.position,mainCamera.transform.forward,hit)) {
		return hit.point;
	} else {
		return (mainCamera.transform.position + 1000*(mainCamera.transform.forward));
	}
}

function OnCollisionEnter (theHit : Collision) {
	if (theHit.gameObject.name != helicopterName) {
	Instantiate(explosion, transform.position, transform.rotation);
	
	GameObject.Find(gameObject.name+"/Flame/InnerCore").particleEmitter.emit = false;
	GameObject.Find(gameObject.name+"/Flame/OuterCore").particleEmitter.emit = false;
	GameObject.Find(gameObject.name+"/Flame/Smoke").particleEmitter.emit = false;
	
	Destroy(GameObject.Find(gameObject.name+"/Flame"),10);
	GameObject.Find(gameObject.name+"/Flame").transform.parent = null;
	Destroy(gameObject);
	}
}