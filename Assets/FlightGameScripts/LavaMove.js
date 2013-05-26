#pragma strict

var startPosition : Vector3;

function Start () {
	startPosition = transform.position;
}

function Update () {
	if (!Pause.isPaused) {
		var position : float = Time.time / 6;
		transform.position= startPosition + 10*Vector3(Mathf.Cos(position),0,Mathf.Sin(position));	
	}
}