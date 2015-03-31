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
	
	//adds a mixed number to the current value
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
	var factors = new Array();
	var counter = 1;
	while (counter <= integer) {
		if (integer % counter == 0)
			factors.push(counter);
		counter++;
	}
	return factors;
};