#pragma strict

var tankPrefab:GameObject;
var battleshipPrefab1:GameObject;
var battleshipPrefab2:GameObject;

var tankRespawnPoints:Transform[];
var battleshipRespawnPoints:Transform[];

private var tanksLeft:int = 0;
private var battleship1sLeft:int = 0;
private var battleship2sLeft:int = 0;

private var tankIndex:int = 0;
private var battleshipIndex:int = 0;
private var lastEnemiesLeft:int;

function Start () {
	lastEnemiesLeft = GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft;
}

function Update () {
	if (GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft < lastEnemiesLeft) {
		tanksLeft = 0;
		battleship1sLeft = 0;
		battleship2sLeft = 0;
		var enemies = GameObject.FindGameObjectsWithTag("Enemy");
		for (var enemy in enemies) {
			if (enemy.name=="P3J_model_track_prefab") {
				tanksLeft++;
			} else if (enemy.name=="battleship1") {
				battleship1sLeft++;
			} else if (enemy.name=="battleship3") {
				battleship2sLeft++;
			}
		}
		
		var obj:GameObject;
		if (tanksLeft<13) {
			for (var i=0;i<3;i++) {
				obj = Instantiate(tankPrefab, tankRespawnPoints[tankIndex].position, tankRespawnPoints[tankIndex].rotation);
				obj.name = tankPrefab.name;
				GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft++;
				tankIndex++;
				tankIndex = tankIndex%tankRespawnPoints.Length;
			}
		}
		if (battleship1sLeft<2) {
			obj = Instantiate(battleshipPrefab1, battleshipRespawnPoints[battleshipIndex].position, battleshipRespawnPoints[battleshipIndex].rotation);
			obj.name = battleshipPrefab1.name;
			GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft++;
			battleshipIndex++;
			battleshipIndex = battleshipIndex%battleshipRespawnPoints.Length;
		}
		if (battleship2sLeft<4) {
			obj = Instantiate(battleshipPrefab2, battleshipRespawnPoints[battleshipIndex].position, battleshipRespawnPoints[battleshipIndex].rotation);
			obj.name = battleshipPrefab2.name;
			GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft++;
			battleshipIndex++;
			battleshipIndex = battleshipIndex%battleshipRespawnPoints.Length;
		}
	}
	lastEnemiesLeft = GameObject.Find("ControlHub").GetComponent(GUIHandler).enemiesLeft;
}