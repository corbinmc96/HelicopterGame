#pragma strict

private var startTime : float;
var texture : Texture2D;

function OnLevelWasLoaded () {
	startTime = Time.time;
}

function OnGUI () {
	if (Time.time - startTime > 4) {
		Destroy(gameObject.GetComponent(FadeIn));
	}
	GUI.color = Color.white;
	GUI.color.a = Mathf.Lerp(1, 0, (Time.time - startTime)/4);
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), texture);
}