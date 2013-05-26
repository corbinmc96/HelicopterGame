#pragma strict

private var isZoomed : boolean;
var normalZoom : int;
var zoomedZoom : int;
var lastClick : float;

function Start () {
	isZoomed = false;
	lastClick = 0;
}

function Update () {
	if (!Pause.isPaused) {
	if (Input.GetAxis("Up")) {
		camera.fieldOfView -= 20*Time.deltaTime;
	}
	if (Input.GetAxis("Down")) {
		camera.fieldOfView += 20*Time.deltaTime;
	}
	if (camera.fieldOfView < zoomedZoom) {
		camera.fieldOfView = zoomedZoom;
	}
	if (camera.fieldOfView > normalZoom) {
		camera.fieldOfView = normalZoom;
	}
	if (Input.GetAxis("R3") && camera.fieldOfView >= (zoomedZoom+normalZoom)/2 && Time.time >= lastClick+0.25) {
		camera.fieldOfView=zoomedZoom;
		lastClick = Time.time;
	}
	else if (Input.GetAxis("R3") && camera.fieldOfView <= (zoomedZoom+normalZoom)/2 && Time.time >= lastClick+0.25) {
		camera.fieldOfView=normalZoom;
		lastClick = Time.time;
	}
}}