#pragma strict

var upperXBound:int;
var lowerXBound:int;
var upperZBound:int;
var lowerZBound:int;

var maxTurnSpeed:int = 10;
var maxSpeed:int = 5;

var acceleration:int = 2;
var turnAcceleration:int = 5;

var shipFront:Transform;
var tipPoint:Transform;

private var switchTime:float = 0;
private var randomSpeed:float;

private var speed:float;
private var intendedSpeed:float;
private var turnSpeed:float;
private var intendedTurnSpeed:float;

private var hit:RaycastHit;

function objectAhead(distance:float) : Collider {
	var hitColliders = Physics.OverlapSphere(transform.position, distance);
	System.Array.Sort(hitColliders, function (a:Collider, b:Collider) (transform.position-a.transform.position).sqrMagnitude.CompareTo((transform.position-b.transform.position).sqrMagnitude));
	for (var hitCollider:Collider in hitColliders) {
		if (hitCollider.transform.root.tag != "Ground" && hitCollider.transform.root.tag != "Projectile" && hitCollider.transform.root!=transform && Vector3.Angle(transform.forward, hitCollider.transform.position-transform.position) < 45) {
			return hitCollider;
		}
	}
	
	var hits = Physics.RaycastAll(transform.position, Quaternion.AngleAxis(45, Vector3.up)*transform.forward, distance);
	for (hit in hits) {
		if (hit.transform.root!=transform && hit.transform.root.tag!="Ground" && hit.transform.root.tag!="Projectile") {
			return hit.collider;
		}
	}
	
	hits = Physics.RaycastAll(transform.position, Quaternion.AngleAxis(-45, Vector3.up)*transform.forward, distance);
	for (hit in hits) {
		if (hit.transform.root!=transform && hit.transform.root.tag!="Ground" && hit.transform.root.tag!="Projectile") {
			return hit.collider;
		}
	}
	return null;
}


function Update () {
	intendedSpeed = maxSpeed;
	
	if (objectAhead(2*(tipPoint.position-transform.position).magnitude + speed*(speed/acceleration))) {
		//object in front of ship
		//Debug.Log("object ahead", gameObject);
		
		var hitCollider:Collider = objectAhead(2*(tipPoint.position-transform.position).magnitude + speed*(speed/acceleration));
		
		if (Vector3.Angle(transform.right, hitCollider.transform.position-transform.position) < 90) {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		} else {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		}
		intendedSpeed = 0;
		
		switchTime = Time.time;
		
	} else if (shipFront.position.x > upperXBound) {
		//front of ship is out of bounds
		if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 90) {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		} else {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		}
		
		if (shipFront.position.x > upperXBound+50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
			intendedSpeed = 0;
		}
		switchTime = Time.time;
		
	} else if (shipFront.position.x < lowerXBound) {
		//front of ship is out of bounds
		if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 90) {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		} else {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		}
		
		if (shipFront.position.x < lowerXBound-50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
			intendedSpeed = 0;
		}
		switchTime = Time.time;
		
		
	} else if (shipFront.position.z > upperZBound) {
		//front of ship is out of bounds
		if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		} else {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		}
		
		if (shipFront.position.z > upperZBound+50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
			intendedSpeed = 0;
		}
		switchTime = Time.time;
		
		
	} else if (shipFront.position.z < lowerZBound) {
		//front of ship is out of bounds
		if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		} else {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		}
		
		if (shipFront.position.z < lowerZBound-50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
			intendedSpeed = 0;
		}
		switchTime = Time.time;
		
		
		
	} else {
		//proceed normally
		if (Time.time >= switchTime) {
			switchTime = Time.time + 5;
			intendedTurnSpeed = Random.Range(-maxTurnSpeed, maxTurnSpeed);
		}
	}
	
	
	//interpolate speed
	if (Mathf.Abs(speed-intendedSpeed) <= acceleration*Time.deltaTime) {
		speed = intendedSpeed;
	} else if (speed > intendedSpeed) {
		speed -= acceleration*Time.deltaTime;
	} else if (speed < intendedSpeed) {
		speed += acceleration*Time.deltaTime;
	}
	
	//interpolate rotation
	if (Mathf.Abs(turnSpeed-intendedTurnSpeed) <= turnAcceleration*Time.deltaTime) {
		turnSpeed = intendedTurnSpeed;
	} else if (turnSpeed > intendedTurnSpeed) {
		turnSpeed -= turnAcceleration*Time.deltaTime;
	} else if (turnSpeed < intendedTurnSpeed) {
		turnSpeed += turnAcceleration*Time.deltaTime;
	}
	
	//move the ship
	transform.Rotate(0, turnSpeed*Time.deltaTime, 0);
	transform.Translate(0, 0, speed*Time.deltaTime);
}