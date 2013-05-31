#pragma strict

function Start () {

}

function Update () {
	transform.Rotate(Vector3.up*Time.deltaTime*30);
}