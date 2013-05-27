#pragma strict

var normalVolume : float;

function Start () {
	normalVolume = gameObject.GetComponent(AudioSource).volume;
}

function Update () {
	if (Pause.isPaused) {
		gameObject.GetComponent(AudioSource).volume = 0;
	}
	if (!Pause.isPaused) {
		gameObject.GetComponent(AudioSource).volume = normalVolume;
	}
	
}