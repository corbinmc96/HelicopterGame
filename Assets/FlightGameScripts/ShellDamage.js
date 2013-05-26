#pragma strict

var shellDamage : float = 5;

function OnCollisionEnter (myCollision:Collision) {
	if (myCollision.gameObject.GetComponent(Health)!=null) {
		myCollision.gameObject.GetComponent(Health).health-=shellDamage;
	}
}