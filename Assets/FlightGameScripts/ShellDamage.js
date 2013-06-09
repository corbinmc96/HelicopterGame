#pragma strict

var shellDamage : float = 5;

function OnCollisionEnter (myCollision:Collision) {
	if (myCollision.gameObject.GetComponent(Health)!=null) {
		myCollision.gameObject.GetComponent(Health).health-=shellDamage;
	}
}

function OnTriggerEnter (myCollider:Collider) {
	if (myCollider.gameObject.GetComponent(Health)!=null) {
		myCollider.gameObject.GetComponent(Health).health-=shellDamage;
	}
}