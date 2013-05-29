#pragma strict

private var leftTrack : MoveTrack;
private var rightTrack : MoveTrack;

private var leftTrackTransform : Transform;
private var rightTrackTransform : Transform;


var acceleration : float = 5;

private var currentVelocity : float = 0;
private var randomNumber : float;
var maxSpeed : float = 25;
var rotationSpeed : float = 30;

var shellRange : float = 400;
var maxTurretAngle : float = 45;

var upperXBound : float;
var lowerXBound : float;
var upperZBound : float;
var lowerZBound : float;

var targetName : String;
private var target : Transform;

function Start() {
	// Get Track Controls
	leftTrackTransform = transform.Find("Lefttrack");
	rightTrackTransform = transform.Find("Righttrack");
	
	leftTrack = leftTrackTransform.GetComponent(MoveTrack);
	rightTrack = rightTrackTransform.GetComponent(MoveTrack);
		
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

function Update () {
	var directionVector : Vector3 = target.position - transform.position;
	var horizontalVector : Vector3 = directionVector;
	horizontalVector.y = 0;
	
	//determine direction of tank
	var hit : RaycastHit;
	if (isGrounded()) {
		if (transform.position.x > upperXBound || transform.position.x < lowerXBound || transform.position.z > upperZBound || transform.position.z < lowerZBound) {
			//tank out of bounds
			if (Vector3.Angle(transform.forward, Vector3((upperXBound+lowerXBound)/2,0,(upperZBound+lowerZBound)/2)-transform.position) > 30) {
				transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
			}
		} else if (!(rigidbody.SweepTest(transform.forward, hit, currentVelocity * 0.5) 
			|| rigidbody.SweepTest(Quaternion.AngleAxis(45,transform.up) * transform.forward, hit, currentVelocity * 0.5) 
			|| rigidbody.SweepTest(Quaternion.AngleAxis(-45,transform.up) * transform.forward, hit, currentVelocity * 0.5))) {
			//nothing 1/2 second ahead of tank
			
			if (directionVector.magnitude <= shellRange && Mathf.Atan(directionVector.y/horizontalVector.magnitude)*180/Mathf.PI <= maxTurretAngle) {
				//helicopter is in range
				
				if (Vector3.Angle(transform.right, horizontalVector) < 90) {
					//helicopter is to the right of the tank
					randomNumber = Random.value * 1.2 - 0.2;
					transform.Rotate(0,randomNumber * rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.right, horizontalVector) > 90) {
					//helicopter is to the left of the tank
					randomNumber = Random.value * 1.2 - 1;
					transform.Rotate(0,randomNumber * rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.forward, horizontalVector) == 0) {
					//helicopter is directly in front
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				} else {
					//helicopter is directly in back
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				}
			} else if (Mathf.Atan(directionVector.y/horizontalVector.magnitude)*180/Mathf.PI > maxTurretAngle) {
				//underneath the helicopter
				//go away from helicopter
				
				if (Vector3.Angle(transform.right, horizontalVector) < 90) {
					//helicopter is to the right of the tank
					transform.Rotate(0,-rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.right, horizontalVector) > 90) {
					//helicopter is to the left of the tank
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.forward, horizontalVector) == 0) {
					//helicopter is directly in front
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				} else {
					//helicopter is directly in back
					//don't need to turn
				}

				
			} else if (directionVector.magnitude > shellRange) {
				//out of range
				//go toward the helicopter
				
				if (Vector3.Angle(transform.right, horizontalVector) < 90) {
					//helicopter is to the right of the tank
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.right, horizontalVector) > 90) {
					//helicopter is to the left of the tank
					transform.Rotate(0,-rotationSpeed * Time.deltaTime,0);
				} else if (Vector3.Angle(transform.forward, horizontalVector) == 0) {
					//helicopter is directly in front
					//don't need to turn
				} else {
					//helicopter is directly in back
					transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
				}

			}
		} else {
			//something blocking tank's path
			
			if (rigidbody.SweepTest(Quaternion.AngleAxis(45,transform.up) * transform.forward, hit, currentVelocity * 0.5)) {
				//object to the right
				//rotate left
				transform.Rotate(0,-rotationSpeed * Time.deltaTime,0);
			} else {
				//rotate right
				transform.Rotate(0,rotationSpeed * Time.deltaTime,0);
			}
		}
	}
	//calculate angle of traveled vector
	// var moveDistance : float = currentVelocity * Time.deltaTime;
	// var terrainAngle : float = 0;
	// var verticalDistance : float = 0;
	// var distanceTraveled : float = 0;
	// horizontalVector = transform.forward;
	// horizontalVector.y = 0;
	// horizontalVector = horizontalVector.normalized;
	
	// if (moveDistance) {
		// for (var horizontalDistance : float = moveDistance/1000; horizontalDistance<=moveDistance; horizontalDistance+=moveDistance/1000) {
			// verticalDistance = terrain.SampleHeight(transform.position + horizontalDistance * horizontalVector) - terrain.SampleHeight(transform.position);
			// distanceTraveled = Mathf.Sqrt(Mathf.Pow(verticalDistance, 2) + Mathf.Pow(horizontalDistance, 2));
			// if (distanceTraveled > moveDistance) {
				// break;
			// }
			// terrainAngle = Mathf.Atan(verticalDistance/horizontalDistance)*180/Mathf.PI;
		// }
	// }	
	// Physics.Raycast(transform.position, Vector3.down, hit);
	// transform.rotation = Quaternion.LookRotation(Quaternion.AngleAxis(terrainAngle, Vector3.right) * horizontalVector, hit.normal);
	
	
	//move tank forward if grounded
	if (isGrounded()) {
		//adjust acceleration
		if (currentVelocity < maxSpeed) {
			currentVelocity += acceleration * Time.deltaTime;
			if (currentVelocity > maxSpeed) {
				currentVelocity = maxSpeed;
			}
		}
		//move tank
		transform.Translate(0,0,currentVelocity * Time.deltaTime);
	} else {
		currentVelocity = 0;
	}
	
	// Move Tracks by currentVelocity	 
	if (currentVelocity > 0) {
		// Move forward
		leftTrack.speed = currentVelocity;
		leftTrack.GearStatus = 1;
		rightTrack.speed = currentVelocity;
		rightTrack.GearStatus = 1;
	} else if (currentVelocity < 0)	{
		// Move Backward
		leftTrack.speed = -currentVelocity;
		leftTrack.GearStatus = 2;
		rightTrack.speed = -currentVelocity;
		rightTrack.GearStatus = 2;
	} else {
		// No Move
		leftTrack.GearStatus = 0;	
		rightTrack.GearStatus = 0;		
	}
}