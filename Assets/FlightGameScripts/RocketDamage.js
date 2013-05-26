#pragma strict

var rocketDamage : int = 10;

function OnCollisionEnter (myCollision:Collision) {
	if (myCollision.gameObject.GetComponent(EnemyHealth)!=null) {
		myCollision.gameObject.GetComponent(EnemyHealth).health-=rocketDamage;
	}
}

// attach to player's rocket prefab