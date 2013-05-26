#pragma strict

var bulletDamage : float ;

function OnCollisionEnter (myCollision:Collision) {
	if (myCollision.gameObject.GetComponent(EnemyHealth)) {
		myCollision.gameObject.GetComponent(EnemyHealth).health-=bulletDamage;
	}
}

// attach to bullet prefab 