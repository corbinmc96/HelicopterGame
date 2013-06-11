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

private var speed:float;
private var intendedSpeed:float;
private var turnSpeed:float;
private var intendedTurnSpeed:float;

private var hit:RaycastHit;

function objectAhead (distance:float) : boolean {
	if (speed > 0) {
		if (Physics.Raycast(tipPoint.position, transform.forward, hit, distance)) {
			if (hit.transform.name != "Water" && hit.transform.name != "Terrain") {
				return true;
			}
		}
	}
	return false;
}

function Update () {
	intendedSpeed = maxSpeed;
	
	if (shipFront.position.x > upperXBound) {
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
		
		
		
	} else if (objectAhead(speed*3)) {
		//object 3s or less in front of ship
		if (Vector3.Angle(-hit.normal, transform.right) <= 90) {
			//turn left
			intendedTurnSpeed = -maxTurnSpeed;
		} else {
			//turn right
			intendedTurnSpeed = maxTurnSpeed;
		}
		
		if (objectAhead(speed)) {
			//object 1s in front of ship
			intendedSpeed = 0;
		}
		switchTime = Time.time;
		
		
		
	} else {
		//proceed normally
		if (Time.time >= switchTime) {
			switchTime = Time.time + 5;
			intendedSpeed = Random.Range(0, maxSpeed);
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