enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	game.preload('assets/shroompogo.jpg');
	// Creates the different scenes used throughout the game
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var how_to_play_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var play_label = MakeLabel("Play", '16pt tahoma', 'black', 50, 100);
	var howToPlay_label = MakeLabel("How To Play", '16pt tahoma', 'black', 50, 130);
	var options_label = MakeLabel("Options", '16pt tahoma', 'black', 50, 160);
	var credits_label = MakeLabel("Credits", '16pt tahoma', 'black', 50, 190);
	var back_label = MakeLabel("Back", '16pt tahoma', 'black', 0, 300);
	
	var menu_group = new Group();
    game.fps = 30;
	
    game.onload = function(){
		
		
		// ----------------------
		// Define the Menu Scene
		// ----------------------
		
		menu_scene.addChild(play_label);
		menu_scene.addChild(howToPlay_label);
		menu_scene.addChild(options_label);
		menu_scene.addChild(credits_label);
		play_label.addEventListener('touchend', function(){
			game.pushScene(play_scene);
		});
		game.pushScene(menu_scene);
        // -------------------------
		// Define How To Play Scene
		// -------------------------
		var shroom = new Sprite();
		shroom.image = game.assets['assets/shroompogo.jpg'];
		shroom.x = 0;
		shroom.y = 0;
		play_scene.addChild(back_label);
		play_scene.addChild(shroom);
		back_label.addEventListener('touchend', function() {
			game.popScene();
		});
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

function MakeLabel(text, font, color, x, y) {
	var tempLabel = new Label(text);
	tempLabel.font = font;
	tempLabel.color = color;
	tempLabel.x = x;
	tempLabel.y = y;
	
	return tempLabel;
}