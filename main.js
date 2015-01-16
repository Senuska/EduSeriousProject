/*	Fraction Expedition
 *	
 *	Coded by Erik Swanson && Justin Ortiz
 */
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
	var testVar = new MixedNumber(10, 0, 36);
	testVar.toImproperFraction();
	var main_label = new Label(testVar.toString());
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
			return;
		}
		else {
			var clone = otherFraction.clone();
			
			//if this is true, clone.denom is a factor of this.denom
			if (this.denominator % clone.denominator == 0) {
				var scaleValue = this.denominator / clone.denominator;
				this.numerator *= scaleValue;
				this.denominator *= scaleValue;
				this.addFraction(otherFraction);
			}
			//if this is true, this.denom is a factor of clone.denom
			else if (clone.denominator % this.denominator == 0) {
				var scaleValue = clone.denominator / this.denominator;
				this.numerator *= scaleValue;
				this.denominator *= scaleValue;
				this.addFraction(otherFraction);
			}
			//if we hit this one, that means we need to find the lcd
			else {
				
			}
		}
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
			//if we have a whole number and a fraction, then add " and 3/4", etc
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
	var factors = new Array();
	var counter = 1;
	while (counter <= integer) {
		if (integer % counter == 0)
			factors.push(counter);
		counter++;
	}
	return factors;
}