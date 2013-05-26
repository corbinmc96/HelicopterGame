#pragma strict

private var roto1:GameObject;
private var roto2:GameObject;
private var backroto1:GameObject;
private var backroto2:GameObject;

function Start () {
	roto1 = GameObject.Find(gameObject.name+"/ApacRoto ");
	roto2 = GameObject.Find(gameObject.name+"/ApacRot2");
	backroto1 = GameObject.Find(gameObject.name+"/ApacTrot");
	backroto2 = GameObject.Find(gameObject.name+"/ApacTrot ");
}

function Update () {
	if (!Pause.isPaused) {
	roto1.transform.Rotate(0,-700*Time.deltaTime,0);
	roto2.transform.Rotate(0,-700*Time.deltaTime,0);
	backroto1.transform.Rotate(-700*Time.deltaTime,0,0);
	backroto2.transform.Rotate(-700*Time.deltaTime,0,0);
}}