#pragma strict
import System.Collections.Generic;

var rocketDamage : int = 10;
var damageRadius : int = 5;

function OnCollisionEnter (myCollision:Collision) {
	var hits:Collider[] = Physics.OverlapSphere(transform.position, damageRadius);
	var hitObjects:List.<GameObject> = new List.<GameObject>();
	for (var hitCollider:Collider in hits) {
		if (!hitObjects.Contains(hitCollider.transform.root.gameObject)) {
			hitObjects.Add(hitCollider.transform.root.gameObject);
			if (hitObjects[hitObjects.Count-1].GetComponent(EnemyHealth)!=null) {
				var distance:float = (hitCollider.ClosestPointOnBounds(transform.position)-transform.position).magnitude;
				hitObjects[hitObjects.Count-1].GetComponent(EnemyHealth).health -= rocketDamage * (damageRadius - distance)/damageRadius;
				Debug.Log(hitObjects[hitObjects.Count-1]);
				Debug.Log(rocketDamage * (damageRadius - distance)/damageRadius);
			}
		}
	}
}

// attach to player's rocket prefab