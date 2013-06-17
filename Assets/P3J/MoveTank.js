#pragma strict

var layerMask:LayerMask;

var acceleration : float = 5;
var turnAcceleration : float = 15;
var maxSpeed : float = 25;
var maxTurnSpeed : float = 30;

var upperXBound : float;
var lowerXBound : float;
var upperZBound : float;
var lowerZBound : float;

var separationDistance : float = 30;
var responseDistance : float = 300;
var randomSwitchTime : float = 5;

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

private var lastFrameWasRandom : boolean = false;
private var lastRotationSwitch : float;

private var shellRange : float;
private var maxTurretAngle : float;

private var hit:RaycastHit;

function Start() {
	// Get Track Controls
	leftTrackTransform = transform.Find("Lefttrack");
	rightTrackTransform = transform.Find("Righttrack");
	
	leftTrack = leftTrackTransform.GetComponent(MoveTrack);
	rightTrack = rightTrackTransform.GetComponent(MoveTrack);
	
	shellRange = transform.Find("turret").Find("cannon").gameObject.GetComponent(MoveGun).firingDistance;
	maxTurretAngle = transform.Find("turret").Find("cannon").gameObject.GetComponent(MoveGun).upperLimit;
	target = GameObject.Find(targetName).transform;
	
	lastRotationSwitch = Time.time - randomSwitchTime;
}

function isGrounded() : boolean {
	var leftTrackGrounded:boolean = false;
	var rightTrackGrounded:boolean = false;
	
	var leftTrackExtents:Vector3 = leftTrackTransform.gameObject.GetComponent(MeshFilter).mesh.bounds.extents * leftTrackTransform.lossyScale.x;
	
	var firstStartPoint:Vector3 = leftTrack.collider.bounds.center + leftTrackExtents.z * transform.forward + (leftTrackExtents.y+0.1) * -transform.up + leftTrackExtents.x * -transform.right;
	var firstEndPoint:Vector3 = leftTrack.collider.bounds.center + leftTrackExtents.z * -transform.forward + (leftTrackExtents.y+0.1) * -transform.up + leftTrackExtents.x * -transform.right;

	for (var i:int = 0; i<=10; i++) {
		if (Physics.Linecast(firstStartPoint + i/10.0*(2*leftTrackExtents.x) * transform.right + Random.value*0.2*transform.up, firstEndPoint + i/10.0*(2*leftTrackExtents.x) * transform.right + Random.value*0.2*transform.up, hit, layerMask)) {
			if (hit.transform.root.tag == "Ground") {
				leftTrackGrounded = true;
				break;
			}
		}
	}
	
	var rightTrackExtents:Vector3 = rightTrackTransform.gameObject.GetComponent(MeshFilter).mesh.bounds.extents * rightTrackTransform.lossyScale.x;
	
	firstStartPoint = rightTrack.collider.bounds.center + rightTrackExtents.z * transform.forward + (rightTrackExtents.y+0.1) * -transform.up + rightTrackExtents.x * -transform.right;
	firstEndPoint = rightTrack.collider.bounds.center + rightTrackExtents.z * -transform.forward + (rightTrackExtents.y+0.1) * -transform.up + rightTrackExtents.x * -transform.right;

	for (i = 0; i<=10; i++) {
		if (Physics.Linecast(firstStartPoint + i/10.0*(2*rightTrackExtents.x) * transform.right + Random.value*0.2*transform.up, firstEndPoint + i/10.0*(2*rightTrackExtents.x) * transform.right + Random.value*0.2*transform.up, hit, layerMask)) {
			if (hit.transform.root.tag == "Ground") {
				rightTrackGrounded = true;
				break;
			}
		}
	}
	
	
	if (!leftTrackGrounded) {
		return false;
	}
	if (!rightTrackGrounded) {
		return false;
	}
	return true;
}

function objectAhead() : boolean {
	var hits = rigidbody.SweepTestAll(transform.forward, currentSpeed * currentSpeed/acceleration);
	if (hits.length > 0) {
		for (var hit:RaycastHit in hits) {
			if (hit.transform.root.tag != "Ground" && hit.transform.root.tag != "Projectile") {
				return true;
			}
		}
	}
	hits = rigidbody.SweepTestAll(Quaternion.AngleAxis(45,transform.up) * transform.forward, currentSpeed * currentSpeed/acceleration);
	if (hits.length > 0) {
		for (var hit:RaycastHit in hits) {
			if (hit.transform.root.tag != "Ground" && hit.transform.root.tag != "Projectile") {
				return true;
			}
		}
	}
	hits = rigidbody.SweepTestAll(Quaternion.AngleAxis(-45,transform.up) * transform.forward, currentSpeed * currentSpeed/acceleration);
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
		if (enemy.name == "P3J_model_track_prefab" && enemy!=gameObject) {
			return enemy.transform;
		}
	}
	return null;
}

function tankWithinDistance (d:int):boolean {
	var hits = Physics.OverlapSphere(transform.position, d);
	for (var hitCollider in hits) {
		if (hitCollider.transform.root.name == "P3J_model_track_prefab" && hitCollider.transform.root!=transform) {
			return true;
		}
	}
	return false;
}

function Update () {
	var directionVector : Vector3 = target.position - transform.position;
	var horizontalVector : Vector3 = directionVector;
	horizontalVector.y = 0;
	
	var thisFrameWasRandom : boolean = false;

	//Debug.Log(isGrounded());
	
	//determine direction of tank
	if (isGrounded()) {
		intendedSpeed = maxSpeed;
		
		if (transform.position.x > upperXBound) {
			//tank is out of bounds
			Debug.Log("out of bounds", gameObject);
			
			if (Vector3.Angle(transform.forward, Vector3(-1,0,0)) <= 30) {
				//correct direction
				intendedTurnSpeed = 0;
			} else if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 45) {
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
			Debug.Log("out of bounds", gameObject);
			
			if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 30) {
				//correct direction
				intendedTurnSpeed = 0;
			} else if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 90) {
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
			Debug.Log("out of bounds", gameObject);
			
			if (Vector3.Angle(transform.forward, Vector3(0,0,-1)) <= 30) {
				//correct direction
				intendedTurnSpeed = 0;
			} else if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
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
			Debug.Log("out of bounds", gameObject);
			
			if (Vector3.Angle(transform.forward, Vector3(0,0,1)) <= 30) {
				//correct direction
				intendedTurnSpeed = 0;
			} else if (Vector3.Angle(transform.forward, Vector3(1,0,0)) <= 90) {
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
			Debug.Log("object ahead", gameObject);
			
			if (rigidbody.SweepTest(Quaternion.AngleAxis(45,transform.up) * transform.forward, hit, currentSpeed * currentSpeed/acceleration)) {
				//object to the right
				//rotate left
				intendedTurnSpeed = -maxTurnSpeed;
			} else {
				//rotate right
				intendedTurnSpeed = maxTurnSpeed;
			}
		
		} else if (!tankWithinDistance(separationDistance) && nearestTank()) {
			//find other tank
			Debug.Log("finding a companion", gameObject);
			
			var targetTank = nearestTank();
			if (Vector3.Angle(transform.forward, targetTank.position-transform.position) <= 30) {
				//correct direction
				intendedTurnSpeed = 0;
			} else if (Vector3.Angle(transform.right, targetTank.position-transform.position) < 90) {
				//closest tank on the right, turn right
				intendedTurnSpeed = maxTurnSpeed;
			} else {
				//closest tank on the left, turn left
				intendedTurnSpeed = -maxTurnSpeed;
			}
			
		} else if ((target.position-transform.position).magnitude > responseDistance) {
			//circle randomly
			Debug.Log("wandering", gameObject);
			
			intendedSpeed = maxSpeed/2;
			
			if (!lastFrameWasRandom || Time.time - lastRotationSwitch > randomSwitchTime) {
				intendedTurnSpeed = (Random.value-0.5)*2*maxTurnSpeed;
				thisFrameWasRandom = true;
			}
		} else {
			//attack helicopter
			Debug.Log("seek and destroy", gameObject);
			
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
		
	} else {
		//tank not grounded
		intendedSpeed = 0;
		intendedTurnSpeed = 0;
	}
	
	
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
	
	//determine if the tank moved randomly this frame
	lastFrameWasRandom = thisFrameWasRandom;
}