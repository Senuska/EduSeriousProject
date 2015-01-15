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

var Fraction = Class.create({ 
	
	//attributes
	var numerator;
	var denominator;
	
    //constructor
    initialize: function(numerator, denominator) {
      this.numerator = numerator;
	  this.denominator = denominator;
    } 

    //Simplifies the fraction
    simplify: function() {
	  var numeratorFactors = getFactorsFor(numerator);
	  var denominatorFactors = getFactorsFor(denominator);
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
	  
	  numerator /= greatestCommonFactor;
	  denominator /= greatestCommonFactor;
  }
});

var MixedNumber = Class.create(Fraction, {
	
	//attributes
	var wholeNumber;
	
	//constructors
	initialize: function(wholeNumber, numerator, denominator) {
		this.wholeNumber = wholeNumber;
		this.numerator = numerator;
		this.denominator = denominator;
	}
	initialize: function(wholeNumber, fraction) {
		this.wholeNumber = wholeNumber;
		this.numerator = fraction.numerator;
		this.denominator = fraction.denominator;
	}
	
	//simplifies the value of the mixed number
	simplify: function() {
		//gets the simplified whole number and associated fraction
		while (this.numerator >= this.denominator){
			this.numerator -= this.denominator;
			wholeNumber++;
		}
		if (numerator == 0)
			return;
		//now that we have the whole number, we simplify the fraction using the superclass's simplify method
		Fraction.call (simplify);
	}
});

//returns the factors for a specified integer in the form of an array
getFactorsFor: function(integer) {
	var factors = new Array();
	var counter = 0;
	while (counter <= integer) {
		if (integer % counter == 0)
			factors.push(counter);
		counter++;
	}
	return factors;
}