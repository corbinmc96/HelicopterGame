#pragma strict

function Start () {
	if (!PlayerPrefs.HasKey("Rockets")) {
		PlayerPrefs.SetInt("Rockets",0);
	} if (!PlayerPrefs.HasKey("Armor")) {
		PlayerPrefs.SetInt("Armor",100);
	} if (!PlayerPrefs.HasKey("RocketDamage")) {
		PlayerPrefs.SetInt("RocketDamage",1);
	} if (!PlayerPrefs.HasKey("MachineGunDamage")) {
		PlayerPrefs.SetInt("MachineGunDamage",1);
	} if (!PlayerPrefs.HasKey("Money")) {
		PlayerPrefs.SetInt("Money",0);
	}
	PlayerPrefs.Save();
}

function Update () {
	//Debug.Log(PlayerPrefs.GetInt("Money",-1));
}