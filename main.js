enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	
	// Creates the different scenes used throughout the game
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var how_to_play_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var main_label = new Label("Main Label");
	var credit_group = new Group();
    game.fps = 30;
	
    game.onload = function(){
		
		
		// ----------------------
		// Define the Menu Scene
		// ----------------------
		menu_scene.addChild(main_label);
		
		main_label.addEventListener('touchend', function() {
			game.replaceScene(play_scene);
		});
		game.pushScene(menu_scene);
        // -------------------------
		// Define How To Play Scene
		// -------------------------
		play_scene.addChild(new Label("Play Scene"));
		// -------------------------
		// Define the Credits Scene
		// -------------------------
	
		// -------------------------
		// Define the Options Scene
		// -------------------------
		
		// ----------------------
		// Define the Play Scene
		// ----------------------

	}	
    game.start();
};