enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	game.preload('assets/blue_background.gif', 'assets/green_background.gif', 'assets/orange_background.gif', 'assets/logo0.gif', 'assets/inventory_slot.gif', 'assets/inventory_background.gif', 'assets/item_block01.gif', 'assets/item_block02.gif');
	// Creates the different scenes used throughout the game
	var main_scene = new Scene();
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var howToPlay_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var play_button = new Button("Play", "dark", 50, 150);
	var credits_button = new Button("Credits", "dark", 50, 150);
	var logo = new Sprite(775, 300);
	var inventory_background = new Sprite(100, 200);
	var expedition_bag = new Group();
	var item_block = [new Sprite(32, 32), new Sprite(32, 64)];

    game.fps = 30;
	
    game.onload = function(){
		
		var background = [new Sprite(800, 600), new Sprite(800, 600), new Sprite(800, 600)];
		background[0].image = game.assets['assets/blue_background.gif'];
		background[1].image = game.assets['assets/green_background.gif'];
		background[2].image = game.assets['assets/orange_background.gif'];
		logo.image = game.assets['assets/logo0.gif'];
		logo.x = game.width/2 - logo.width/2;
		inventory_background.image = game.assets['assets/inventory_background.gif'];
		expedition_bag.addChild(inventory_background);
		item_block[0].image = game.assets['assets/item_block01.gif'];
		item_block[1].image = game.assets['assets/item_block02.gif'];
		
		/* Create Class for supplies */
		var Item = Class.create(Sprite, {
			initialize: function(image, width, height) {
				this.image = image;
				this.width = width;
				this.height = height;
				var fraction_value;
				var name;
			}
			
			
		});
		
		var item_thing = new Item(game.assets['assets/item_block01.gif'], 50, 50);
		
		
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
		
		/* Next Button */
		howToPlay_scene.addChild(MakeButton('Next', '28pt tahoma', 'dark', 50, 150, game.width - 175, game.height - 60, function() {
			game.replaceScene(play_scene);
		}));
		
		// -------------------------
		// Define the Credits Scene
		// -------------------------
		credits_scene.addChild(background[2]);
		credits_scene.addChild(MakeLabel("Credits Scene", '28pt tahoma', 'white', 50, 50));
		
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
		play_scene.addChild(background[2]);
		
		/* Inventory Grid */
		/*for(var i = 0; i < 5; i++) {
			for(var j = 0; j < 11; j++) {
				var tempSprite = new Sprite(32, 32);
				tempSprite.x = expedition_bag.x + i*17;
				tempSprite.y = expedition_bag.y + j*17;
				tempSprite.scaleX = 0.5;
				tempSprite.scaleY = 0.5;
				tempSprite.image = game.assets['assets/inventory_slot.gif'];
				expedition_bag.addChild(tempSprite);
			}
		}*/
		
		
		
		/* Back Button */
		play_scene.addChild(MakeButton('Back', '28pt tahoma', 'dark', 50, 150, 5, game.height - 60, function() {
			game.popScene();
		}));

	}	
    game.start();
};
// Definition for the Supply object
function Supply(sprite, id, value) {
	
	// Graphical representation for this supply
	this.sprite = sprite;
	// The fraction value of this supply
	this.value = value;
	// The user-generated ID for the supply
	this.id = id;
	
	function AddToSupplyBag(bag) {
		// Add this to the array in the bag
		bag.contents.push(this);
	}
};

// Definition for the SupplyBag Object
function SupplyBag(size) {
	this.size = size;
	this.contents = [];
	
	function Contains(supply) {
		for(i = 0; i < this.contents.length; i++) {
			if(contents[i].id == supply.id) {
				// The specified supply has been found
				return true;
			}
		}
		
		// If it doesn't find the supply in the bag
		return false;
	}
	
	function CalculateSize() {
		// Sum all of the fraction values of the supplies into one fraction value
	}
	
	function Generate() {
		// Create a grid that will scale with an expedition’s count size
	}
}

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
	tempButton.y = y;
	tempButton.addEventListener('touchend', event);
	return tempButton;
};

function MakeSprite(image, width, height) {
	var tempSprite = new Sprite(width, height);
	tempSprite.image = image;
	return tempSprite;
};

function DragAndDrop(entity) {
	entity.addEventListener(Event.TOUCH_START, function (e) {
		var deltaX = entity.x - e.x;
		var deltaY = entity.y - e.y;
		entity.x = e.x;
		entity.y = e.y;
	});
	
	entity.addEventListener(Event.TOUCH_MOVE, function(e) {
		var deltaX = entity.x - e.x;
		var deltaY = entity.y - e.y;
		entity.x = e.x;
		entity.y = e.y;
	});
}

function SnapToInventoryGrid(inventory, entity) {
	for(var i = 0; i < inventory.childNodes.length; i++) {
		if(Math.abs(inventory.childNodes[i].x - entity.x) < 2) {
			entity.x = inventory.childNodes[i].x;
		}
	}
}

function FitToScreen(entity, game) {
	var scaleX = game.width / entity.width;
	var scaleY = game.height / entity.height;
	
	entity.scaleX = scaleX;
	entity.scaleY = scaleY;
}