#pragma strict

function FixedUpdate () {
	if (Vector3.Angle(transform.up, Vector3.up) > 75) {
		rigidbody.AddTorque(Vector3.Cross(transform.up, Vector3.up).normalized);
	}
}