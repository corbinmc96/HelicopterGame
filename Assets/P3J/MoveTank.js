#pragma strict

var acceleration : float = 5;
var turnAcceleration : float = 5;
var maxSpeed : float = 25;
var maxTurnSpeed : float = 30;

var upperXBound : float;
var lowerXBound : float;
var upperZBound : float;
var lowerZBound : float;

var separationDistance : float = 30;

var targetName : String;
private var target : Transform;

private var leftTrack : MoveTrack;
private var rightTrack : MoveTrack;
private var leftTrackTransform : Transform;
private var rightTrackTransform : Transform;

private var currentSpeed : float = 0;
private var intendedSpeed : float;
private var turnSpeed : float;
private var intendedTurnSpeed : float;
private var randomNumber : float;

private var shellRange : float;
private var maxTurretAngle : float;

function Start() {
	// Get Track Controls
	leftTrackTransform = transform.Find("Lefttrack");
	rightTrackTransform = transform.Find("Righttrack");
	
	leftTrack = leftTrackTransform.GetComponent(MoveTrack);
	rightTrack = rightTrackTransform.GetComponent(MoveTrack);
	
	shellRange = transform.Find("turret").Find("cannon").gameObject.GetComponent(MoveGun).firingDistance;
	maxTurretAngle = transform.Find("turret").Find("cannon").gameObject.GetComponent(MoveGun).upperLimit;
	target = GameObject.Find(targetName).transform;
}

function isGrounded() : boolean {
	if (!Physics.Raycast(leftTrackTransform.collider.bounds.center, -transform.up, leftTrackTransform.collider.bounds.extents.y + 0.1)) {
		return false;
	}
	if (!Physics.Raycast(rightTrackTransform.collider.bounds.center, -transform.up, rightTrackTransform.collider.bounds.extents.y + 0.1)) {
		return false;
	}
	return true;
}

function objectAhead() : boolean {
	var hits = rigidbody.SweepTestAll(transform.forward, currentSpeed * 0.5);
	if (hits.length > 0) {
		for (var hit:RaycastHit in hits) {
			if (hit.transform.root.tag != "Ground" && hit.transform.root.tag != "Projectile") {
				return true;
			}
		}
	}
	hits = rigidbody.SweepTestAll(Quaternion.AngleAxis(45,transform.up) * transform.forward, currentSpeed * 0.5);
	if (hits.length > 0) {
		for (var hit:RaycastHit in hits) {
			if (hit.transform.root.tag != "Ground" && hit.transform.root.tag != "Projectile") {
				return true;
			}
		}
	}
	hits = rigidbody.SweepTestAll(Quaternion.AngleAxis(-45,transform.up) * transform.forward, currentSpeed * 0.5);
	if (hits.length > 0) {
		for (var hit:RaycastHit in hits) {
			if (hit.transform.root.tag != "Ground" && hit.transform.root.tag != "Projectile") {
				return true;
			}
		}
	}
	return false;
}

function nearestTank ():Transform {
	var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	System.Array.Sort(enemies, function (a:GameObject, b:GameObject) (transform.position-a.transform.position).sqrMagnitude.CompareTo((transform.position-b.transform.position).sqrMagnitude));
	for (var enemy in enemies) {
		if (enemy.name == "P3J_model_track_prefab") {
			return enemy.transform;
		}
	}
	return null;
}

function tankWithinDistance (d:int):boolean {
	var hits = Physics.OverlapSphere(transform.position, d);
	for (var hitCollider in hits) {
		if (hitCollider.transform.root.name == "P3J_model_track_prefab") {
			return true;
		}
	}
	return false;
}

function Update () {
	var directionVector : Vector3 = target.position - transform.position;
	var horizontalVector : Vector3 = directionVector;
	horizontalVector.y = 0;
	
	//determine direction of tank
	if (isGrounded()) {
		var hit : RaycastHit;
		intendedSpeed = maxSpeed;
		
		if (transform.position.x > upperXBound) {
			//tank is out of bounds
			if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 90) {
				//turn left
				intendedTurnSpeed = -maxTurnSpeed;
			} else {
				//turn right
				intendedTurnSpeed = maxTurnSpeed;
			}
			
			if (transform.position.x > upperXBound+50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
				intendedSpeed = 0;
			}
			
		} else if (transform.position.x < lowerXBound) {
			//tank is out of bounds
			if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 90) {
				//turn right
				intendedTurnSpeed = maxTurnSpeed;
			} else {
				//turn left
				intendedTurnSpeed = -maxTurnSpeed;
			}
			
			if (transform.position.x < lowerXBound-50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
				intendedSpeed = 0;
			}
			
			
		} else if (transform.position.z > upperZBound) {
			//tank is out of bounds
			if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
				//turn right
				intendedTurnSpeed = maxTurnSpeed;
			} else {
				//turn left
				intendedTurnSpeed = -maxTurnSpeed;
			}
			
			if (transform.position.z > upperZBound+50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
				intendedSpeed = 0;
			}
			
			
		} else if (transform.position.z < lowerZBound) {
			//tank is out of bounds
			if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
				//turn left
				intendedTurnSpeed = -maxTurnSpeed;
			} else {
				//turn right
				intendedTurnSpeed = maxTurnSpeed;
			}
			
			if (transform.position.z < lowerZBound-50 && Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,transform.position.y,(upperZBound+lowerZBound)/2)-transform.position) > 45) {
				intendedSpeed = 0;
			}

		} else if (objectAhead()) {
			//something blocking tank's path
			
			if (rigidbody.SweepTest(Quaternion.AngleAxis(45,transform.up) * transform.forward, hit, currentSpeed * 0.5)) {
				//object to the right
				//rotate left
				intendedTurnSpeed = -maxTurnSpeed;
			} else {
				//rotate right
				intendedTurnSpeed = maxTurnSpeed;
			}
		
		} else if (!tankWithinDistance(separationDistance) && nearestTank()) {
			//find other tank
			var targetTank = nearestTank();
			
			if (Vector3.Angle(transform.right, targetTank.position-transform.position) < 90) {
				//closest tank on the right, turn right
				intendedTurnSpeed = maxTurnSpeed;
			} else {
				//closest tank on the left, turn left
				intendedTurnSpeed = -maxTurnSpeed;
			}
			
		} else {
			//proceed normally
			if (directionVector.magnitude <= shellRange && Mathf.Atan(directionVector.y/horizontalVector.magnitude)*180/Mathf.PI <= maxTurretAngle) {
				//helicopter is in range
				
				if (Vector3.Angle(transform.right, directionVector) < 90) {
					//helicopter is to the right of the tank
					randomNumber = Random.value * 1.2 - 0.2;
					intendedTurnSpeed = randomNumber * maxTurnSpeed;
				} else if (Vector3.Angle(transform.right, directionVector) > 90) {
					//helicopter is to the left of the tank
					randomNumber = Random.value * 1.2 - 1;
					intendedTurnSpeed = randomNumber * maxTurnSpeed;
				} else if (Vector3.Angle(transform.forward, horizontalVector) == 0) {
					//helicopter is directly in front
					intendedTurnSpeed = maxTurnSpeed;
				} else {
					//helicopter is directly in back
					intendedTurnSpeed = maxTurnSpeed;
				}
			} else if (Mathf.Atan(directionVector.y/directionVector.magnitude)*180/Mathf.PI > maxTurretAngle) {
				//underneath the helicopter
				//go away from helicopter
				
				if (Vector3.Angle(transform.right, directionVector) < 90) {
					//helicopter is to the right of the tank
					intendedTurnSpeed = -maxTurnSpeed;
				} else if (Vector3.Angle(transform.right, directionVector) > 90) {
					//helicopter is to the left of the tank
					intendedTurnSpeed = maxTurnSpeed;
				} else if (Vector3.Angle(transform.forward, horizontalVector) == 0) {
					//helicopter is directly in front
					intendedTurnSpeed = maxTurnSpeed;
				} else {
					//helicopter is directly in back
					//don't need to turn
				}

				
			} else if (directionVector.magnitude > shellRange) {
				//out of range
				//go toward the helicopter
				
				if (Vector3.Angle(transform.right, directionVector) < 90) {
					//helicopter is to the right of the tank
					intendedTurnSpeed = maxTurnSpeed;
				} else if (Vector3.Angle(transform.right, directionVector) > 90) {
					//helicopter is to the left of the tank
					intendedTurnSpeed = -maxTurnSpeed;
				} else if (Vector3.Angle(transform.forward, directionVector) == 0) {
					//helicopter is directly in front
					//don't need to turn
				} else {
					//helicopter is directly in back
					intendedTurnSpeed = maxTurnSpeed;
				}

			}
		}
	
		//move tank forward
		//adjust acceleration
		if (Mathf.Abs(currentSpeed-intendedSpeed) <= acceleration*Time.deltaTime) {
			currentSpeed = intendedSpeed;
		} else if (currentSpeed > intendedSpeed) {
			currentSpeed -= acceleration*Time.deltaTime;
		} else if (currentSpeed < intendedSpeed) {
			currentSpeed += acceleration*Time.deltaTime;
		}
		
		if (Mathf.Abs(turnSpeed-intendedTurnSpeed) <= turnAcceleration*Time.deltaTime) {
			turnSpeed = intendedTurnSpeed;
		} else if (turnSpeed > intendedTurnSpeed) {
			turnSpeed -= turnAcceleration*Time.deltaTime;
		} else if (turnSpeed < intendedTurnSpeed) {
			turnSpeed += turnAcceleration*Time.deltaTime;
		}
		
		//move tank
		transform.Rotate(0, turnSpeed * Time.deltaTime, 0);
		transform.Translate(0,0,currentSpeed * Time.deltaTime);
	} else {
		//tank not grounded
		intendedSpeed = 0;
		if (Mathf.Abs(currentSpeed-intendedSpeed) <= acceleration*Time.deltaTime) {
			currentSpeed = intendedSpeed;
		} else if (currentSpeed > intendedSpeed) {
			currentSpeed -= acceleration*Time.deltaTime;
		} else if (currentSpeed < intendedSpeed) {
			currentSpeed += acceleration*Time.deltaTime;
		}
	}
	
	// Move Tracks by currentSpeed	 
	if (currentSpeed > 0) {
		// Move forward
		leftTrack.speed = currentSpeed;
		leftTrack.GearStatus = 1;
		rightTrack.speed = currentSpeed;
		rightTrack.GearStatus = 1;
	} else if (currentSpeed < 0)	{
		// Move Backward
		leftTrack.speed = -currentSpeed;
		leftTrack.GearStatus = 2;
		rightTrack.speed = -currentSpeed;
		rightTrack.GearStatus = 2;
	} else {
		// No Move
		leftTrack.GearStatus = 0;	
		rightTrack.GearStatus = 0;		
	}
}