#pragma strict
import System.Collections.Generic;

var rocketDamage : int = 10 * PlayerPrefs.GetFloat("RocketDamage",1);
var damageRadius : int = 5;

function OnCollisionEnter () {
	var hits:Collider[] = Physics.OverlapSphere(transform.position, damageRadius);
	var hitObjects:List.<GameObject> = new List.<GameObject>();
	var distance:float;
	System.Array.Sort(hits,
		function (a:Collider, b:Collider) (transform.position - a.ClosestPointOnBounds(transform.position)).sqrMagnitude.CompareTo((transform.position - b.ClosestPointOnBounds(transform.position)).sqrMagnitude)
	);
	
	for (var hitCollider:Collider in hits) {
		//ship turret damage
		if (hitCollider.gameObject.GetComponent(TurretHealth)) {
			distance = (hitCollider.ClosestPointOnBounds(transform.position)-transform.position).magnitude;
			hitCollider.gameObject.GetComponent(TurretHealth).health -= rocketDamage * (damageRadius - distance)/damageRadius;
		}
		
		//limits damage to closest collider on object
		if (!hitObjects.Contains(hitCollider.transform.root.gameObject)) {
			hitObjects.Add(hitCollider.transform.root.gameObject);
			if (hitObjects[hitObjects.Count-1].GetComponent(EnemyHealth)!=null) {
				distance = (hitCollider.ClosestPointOnBounds(transform.position)-transform.position).magnitude;
				hitObjects[hitObjects.Count-1].GetComponent(EnemyHealth).health -= rocketDamage * (damageRadius - distance)/damageRadius;
				//Debug.Log(hitObjects[hitObjects.Count-1]);
				//Debug.Log(rocketDamage * (damageRadius - distance)/damageRadius);
			} else if (hitObjects[hitObjects.Count-1].GetComponent(ShipHealth)!=null) {
				distance = (hitCollider.ClosestPointOnBounds(transform.position)-transform.position).magnitude;
				hitObjects[hitObjects.Count-1].GetComponent(ShipHealth).health -= rocketDamage * (damageRadius - distance)/damageRadius;
				//Debug.Log(hitObjects[hitObjects.Count-1]);
				//Debug.Log(rocketDamage * (damageRadius - distance)/damageRadius);
			}
		}
	}
}