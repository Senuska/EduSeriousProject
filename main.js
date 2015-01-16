enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	game.preload('assets/shroompogo.jpg', 'assets/blue_background.gif', 'assets/green_background.gif', 'assets/orange_background.gif', 'assets/logo0.gif');
	// Creates the different scenes used throughout the game
	var main_scene = new Scene();
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var howToPlay_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var play_label = MakeLabel("Play", '16pt tahoma', 'black', 50, 100);
	var play_button = new Button("Play", "dark", 50, 150);
	var credits_button = new Button("Credits", "dark", 50, 150);
	var logo = new Sprite(775, 300);

    game.fps = 30;
	
    game.onload = function(){
		
		var background = [new Sprite(800, 600), new Sprite(800, 600), new Sprite(800, 600)];
		background[0].image = game.assets['assets/blue_background.gif'];
		background[1].image = game.assets['assets/green_background.gif'];
		background[2].image = game.assets['assets/orange_background.gif'];
		logo.image = game.assets['assets/logo0.gif'];
		logo.x = game.width/2 - logo.width/2;
		
		// ----------------------
		// Define the Menu Scene
		// ----------------------
		menu_scene.addChild(background[0]);
		menu_scene.addChild(logo);
		
		/* Play Button */
		play_button.x = game.width/2 - play_button.width/2;
		play_button.y = 300;
		play_button.font = '28pt tahoma';
		
		play_button.addEventListener('touchend', function() {
			game.pushScene(howToPlay_scene);
		});
		menu_scene.addChild(play_button);
		
		/* Credits Button */
		credits_button.x = game.width/2 - credits_button.width/2;
		credits_button.y = play_button.y + credits_button.height + 20;
		credits_button.font = '28pt tahoma';
		
		credits_button.addEventListener('touchend', function() {
			game.pushScene(credits_scene);
		});
		menu_scene.addChild(credits_button);
		
		game.pushScene(menu_scene);
		
		// -------------------------
		// Define How To Play Scene
		// -------------------------
		howToPlay_scene.addChild(background[1]);
		
		/* Back Button */
		howToPlay_scene.addChild(MakeButton('Back', '28pt tahoma', 'dark', 50, 150, 5, game.height - 60, function() {
			game.popScene();
		}));
		
		// -------------------------
		// Define the Credits Scene
		// -------------------------
		credits_scene.addChild(background[2]);
		
		/* Back Button */
		credits_scene.addChild(MakeButton('Back', '28pt tahoma', 'dark', 50, 150, 5, game.height - 60, function() {
			game.popScene();
		}));
		
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
};

function MakeButton(text, font, theme, height, width, x, y, event) {
	var tempButton = new Button(text, theme, height, width);
	tempButton.font = font;
	tempButton.x = x;
	tempButton.y =  y;
	tempButton.addEventListener('touchend', event);
	return tempButton;
}