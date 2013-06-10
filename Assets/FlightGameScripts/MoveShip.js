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

private var switchTime:float = 0;

private var speed:float;
private var intendedSpeed:float;
private var turnSpeed:float;
private var intendedTurnSpeed:float;

private var hit:RaycastHit;

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
		switchTime = Time.time;
		
		
		
	} else if (rigidbody.SweepTest(transform.forward, hit, speed * 3)) {
		//object 3s or less in front of ship
		if (hit.distance < speed) {
			//object 1s in front of ship
			intendedSpeed = 0;
		}
		if (Vector3.Angle(hit.transform.position-transform.position, transform.right) <= 90) {
			//object is on right side
			intendedTurnSpeed = -maxTurnSpeed;
		} else {
			//object is on left side
			intendedTurnSpeed = maxTurnSpeed;
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