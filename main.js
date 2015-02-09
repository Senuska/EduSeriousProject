/*	Fraction Expedition
 *	
 *	Coded by Erik Swanson && Justin Ortiz
 */
enchant();
window.onload = function(){
	
	// Creates game variable and preloads art assets for every scene
    var game = new Core(800, 600);
	game.preload('assets/blue_background.gif', 'assets/green_background.gif', 'assets/orange_background.gif', 'assets/logo0.gif', 'assets/inventory_slot.gif', 'assets/inventory_background.gif', 'assets/item_block01.gif', 'assets/item_block02.gif');
	// Creates the different scenes used throughout the game
    var menu_scene = new Scene();
    var play_scene = new Scene();
    var howToPlay_scene = new Scene();
	var credits_scene = new Scene();
	var options_scene = new Scene();
	var play_button = new Button("Play", "dark", 50, 150);
	var credits_button = new Button("Credits", "dark", 50, 150);
	var logo = new Sprite(775, 300);
	var supplyTest_icon = new Sprite(64, 64);
	
	var supply_test = new Supply(supplyTest_icon, 0, new Fraction(1, 2));

    game.fps = 30;
	
    game.onload = function(){
		
		var background = [new Sprite(800, 600), new Sprite(800, 600), new Sprite(800, 600)];
		background[0].image = game.assets['assets/blue_background.gif'];
		background[1].image = game.assets['assets/green_background.gif'];
		background[2].image = game.assets['assets/orange_background.gif'];
		logo.image = game.assets['assets/logo0.gif'];
		logo.x = game.width/2 - logo.width/2;
		supplyTest_icon.image = game.assets['assets/blue_background.gif'];
		
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
		DragAndDrop(supply_test.sprite);
		
		play_scene.addChild(supply_test.sprite);
		console.log('supply_test value: ' + supply_test.value.toString());
		
		/* Back Button */
		play_scene.addChild(MakeButton('Back', '28pt tahoma', 'dark', 50, 150, 5, game.height - 60, function() {
			game.popScene();
		}));

	}	
    game.start();
};

function Fraction (numerator, denominator) { 
	
	//attributes
	this.numerator = numerator;
	this.denominator = denominator;

    //Simplifies the fraction
    this.simplify = function simplify() {
		//arrays to store
		var numeratorFactors = getFactorsFor(this.numerator);
		var denominatorFactors = getFactorsFor(this.denominator);
		var greatestCommonFactor = 0;
		
		for (var nfactors = 0; nfactors < numeratorFactors.length; nfactors++) {
			for (var dfactors = 0; dfactors < denominatorFactors.length; dfactors++) {
				if (numeratorFactors[nfactors] == denominatorFactors[dfactors]) {
					if (numeratorFactors[nfactors] > greatestCommonFactor) {
						greatestCommonFactor = numeratorFactors[nfactors];
					}  
				}
			}
		}
	  
		if (greatestCommonFactor <= 1)
			return;
	  
		this.numerator /= greatestCommonFactor;
		this.denominator /= greatestCommonFactor;
	}
	
	//adds another fraction to the current value of this fraction
	this.addFraction = function addFraction(otherFraction) {
		if (this.denominator == otherFraction.denominator) {
			this.numerator += otherFraction.numerator;
		}
		else {
			var clone = otherFraction.clone();
			var lcd = 0;
			var larger;
			var smaller;
			
			if (this.denominator < clone.denominator) {
				larger = clone.denominator;
				smaller = this.denominator;
			}
			else {
				larger = this.denominator;
				smaller = clone.denominator;
			}
			
			for (var i = 1; i < smaller; i++) {
				if ((larger * i) % smaller == 0) {
					lcd = larger * i;
					break;
				}
			}
			if (lcd == 0) {
				if (this.denominator != smaller) {
					this.scale(smaller);
				}
				else if (clone.denominator != smaller) {
					clone.scale(smaller);
				}
			}
			else {
				this.scale(lcd / this.denominator);
				clone.scale(lcd / clone.denominator);
			}
			this.addFraction(clone);
		}
	}
	
	this.scale = function scale(value) {
		this.numerator *= value;
		this.denominator *= value;
	}
	
	//this method returns a copy of the values
	this.clone = function clone() {
		return new Fraction(this.numerator, this.denominator);
	}
	
	//this function converts the values into a readable string
	this.toString = function toString() {
		return this.numerator + "/" + this.denominator;
	}
};

//makes a mixed number using the fraction class
function MixedNumber (wholeNumber, numerator, denominator) {
	
	//attributes
	this.wholeNumber = wholeNumber;
	this.fraction = new Fraction(numerator, denominator);
	
	//simplifies the value of the mixed number
	this.simplify = function simplify() {
		//gets the simplified whole number and associated fraction
		while (this.fraction.numerator >= this.fraction.denominator){
			this.fraction.numerator -= this.fraction.denominator;
			this.wholeNumber++;
		}
		//now that we have the whole number, we simplify the fraction using the superclass's simplify method
		this.fraction.simplify();
	}
	
	//adds a fraction to the current value
	this.addFraction = function addFraction(otherFraction) {
		this.fraction.addFraction(otherFraction);
		this.simplify();
	}
	
	this.addMixedNumber = function addMixedNumber(otherMixedNumber) {
		this.wholeNumber += otherMixedNumber.wholeNumber;
		this.fraction.addFraction(otherMixedNumber.fraction);
		this.simplify();
	}
	
	//this function converts the mixed number into an improper fraction
	this.toImproperFraction = function toImproperFraction() {
		for (;this.wholeNumber > 0; this.wholeNumber--)
			this.fraction.numerator += this.fraction.denominator;
		return this.fraction;
	}
	
	//this function converts the values into a readable string
	this.toString = function toString() {
		var temp = "";
		//if we have a whole number, then we want to display it
		if (this.wholeNumber > 0) {
			temp += this.wholeNumber;
			//if we have a whole number and a fraction, then add " and n/d", etc
			if (this.fraction.numerator > 0)
				temp += " and " + this.fraction.toString();
		}
		//if we do not have a whole number, but we have a fraction, then display the fraction
		else if (this.fraction.numerator > 0) {
			temp += this.fraction.toString();
		}
		return temp;
	}
};

//returns the factors for a specified integer in the form of an array
function getFactorsFor(integer) {
	var factors = [];
	var counter = 1;
	while (counter <= integer) {
		if (integer % counter == 0)
			factors.push(counter);
		counter++;
	}
	return factors;
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
	
	function addEventListener(event_type, listener) {
		sprite.AddEventListener(event_type, listener);
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
		var tempFrac;
		for(i = 0; i < this.contents.length; i++) {
			if(i == 0) {
				tempFrac = this.contents[i].value;
			}
			else {
				tempFrac = this.contents[i].value.addFraction(tempFrac);
			}
		}
		this.size = tempFrac;
	}
	
	function Generate() {
		// Create a grid that will scale with an expedition’s count size
	}
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
};

function SnapToInventoryGrid(inventory, entity) {
	for(var i = 0; i < inventory.childNodes.length; i++) {
		if(Math.abs(inventory.childNodes[i].x - entity.x) < 2) {
			entity.x = inventory.childNodes[i].x;
		}
	}
};

function FitToScreen(entity, game) {
	var scaleX = game.width / entity.width;
	var scaleY = game.height / entity.height;
	
	entity.scaleX = scaleX;
	entity.scaleY = scaleY;
};