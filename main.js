enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	game.preload('assets/shroompogo.jpg', 'assets/blue_background.gif', 'assets/green_background.gif', 'assets/orange_background.gif');
	// Creates the different scenes used throughout the game
	var main_scene = new Scene();
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var howToPlay_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var play_label = MakeLabel("Play", '16pt tahoma', 'black', 50, 100);
	var howToPlay_label = MakeLabel("How To Play", '16pt tahoma', 'black', 50, 130);
	var options_label = MakeLabel("Options", '16pt tahoma', 'black', 50, 160);
	var credits_label = MakeLabel("Credits", '16pt tahoma', 'black', 50, 190);
	var back_label = MakeLabel("Back", '16pt tahoma', 'black', 2, 575);
	var menu_group = new Group();
    game.fps = 30;
	
    game.onload = function(){
		
		var background = [new Sprite(800, 600), new Sprite(800, 600), new Sprite(800, 600)];
		background[0].image = game.assets['assets/blue_background.gif'];
		background[1].image = game.assets['assets/green_background.gif'];
		background[2].image = game.assets['assets/orange_background.gif'];
		
		
		// ----------------------
		// Define the Menu Scene
		// ----------------------
		menu_scene.addChild(background[0]);
		menu_scene.addEventListener('touchend', function() {
			game.pushScene(howToPlay_scene);
		});
		game.pushScene(menu_scene);
		// -------------------------
		// Define How To Play Scene
		// -------------------------
		howToPlay_scene.addChild(background[1]);
		howToPlay_scene.addChild(back_label);
		howToPlay_scene.addEventListener('touchend', function() {
			game.pushScene(play_scene);
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
		play_scene.addChild(background[2]);
		play_scene.addChild(back_label);
		back_label.addEventListener('touchend', function(){
			game.popScene();
		});

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