// FlashCard Generator
// Cloze Cards!!!!!!!!!
// =================================================================================
//
//Global Variables
// =================================================================================
// file system is required to run this program
var fs = require("fs"); 
// npm install inquirer
var inquirer = require("inquirer")
var input = process.argv[3];
var input2 = process.argv[4];
var input3 = process.argv[5];

// clozeFunction, where instead of asking for a question to ask on the front of the card
// and the answer on the back of the card.  This will ask for a cloze deletion for
// the front of the card, and a completed sentence, to include the cloze deletion on
// the back of the card.
// Everything else that occurs in this program will take place within this function
function clozeFunction() {

	// if the first input argument is random and command line argument 5 is undefined
	// If the user is not creating any more flash cards, this will generate a random
	// flashcard from the pile of created flashcards
	if (input === "first-add" && input3 === undefined) {

		// variable for the counter
		var count = 0;

		// Empty array for the deck of flashcards
		var cards = [];

		// Function for creating new flash cards
		function CreateCard(cloze, partial) {

			// this function for cloze, partial and full
			this.cloze = cloze;
			this.partial = " ..." + partial;
			this.full = cloze + " " + partial;

		} // End CreateCard Function

		// getInfo function gets the data for the front and back of the card
		var getInfo = function() {

			if (count < parseInt(input2)) {

				// npm install inquirer to prompt for user input
				inquirer.prompt([

					// Data for the front of the card
				{
					name: "cloze",
					message: "What is the cloze deletion of the flashcard?"
				},

					// Data for the back of the card
				{
					name: "partial",
					message: "What is the partial text of the flashcard?"

					// then(funciton(answers)) determines which of the sides contains
					// the answer for the respecitve flashcard
				}]).then(function(answers) {
					// The variable card pulls a new card from the deck
					var card = new CreateCard(asnwers.cloze, answers.partial, answers.full);

					// Pushes the card to the user
					cards.push(card);

					// it progresses by one card
					count++;

					// and runs the getInfo function
					getInfo();
				}); // End function(answers)

			} else {

				// Appends the file using the filesystem to the clozelog.txt file attached
				// to this folder
				fs.appendFile("clozelog.txt", JSON.stringify(cards), function(err) {

					// Error function
					if (err) {

						// logs an error if one exists
						console.log(err);
					} // End if statement
				}); // End fs.appendFile("clozelog.txt, ...")
			}; // End if else statement
		}; // End getInfo()

		// Run the getInfo Function
		getInfo();

	// If command line argument 2 input requests to add a card and the command line
	// argument 5 is undefined, than run through these lines	
	} else if (input === "random" && input3 === undefined) {

		// CreateCard function
		function CreateCard(cloze, partial) {
			this.cloze = cloze;
			this.partial = " ..." + partial;
			this.full = cloze + " " + partial;
		} // End function CreateCard()

		// Appends file to the clozelog.txt file in the folder for this project
		fs.appendFile("clozelog.txt", "utf8", function(err, data) {

			// Error redundancie
			if (err) {

				// logs error if one exists
				console.log(err);

				// If there isn't any errors...
			} else {
				// defines the cards varible and parses the data for your viewing pleasure
				var cards = JSON.parse(data);

				// resets counter to 0
				var count = 0;

				// counter function
				function counter() {
					if (counter <= cards.length) {
						cardFront();
						counter++;
						setTimeout(function() {counter() }, 6000);
					} // End if (counter)
				}; // End function counter()

				// function used to define the front of the card
				function cardFront() {

					// randomizes cards
					var random = Math.floor(Math.random() (cards.length));
					// my attempt to make it look good and readable
					console.log(" ");
					console.log("-----------------------------------");
					console.log("Finish the Sentence: " + cards[random].partial);

					// when the timer is up, it will reveal the answer
					setTimeout(function() {console.log("Answer: " + cards[random].cloze),
						console.log("Full Answer: " + cards[random].full) }, 5000);
					setTimeout(function() {console.log("------------------------------------"),
						console.log(" "), cards.splice(random, 1); }, 5100);
				}; // End function cardFront

				// runs the function again for the next card
				cardFront();
			} // End if else statment
		}); // End fs.appendFile() & function(err, data)

	// if the user input is add, then it will start this function to add another card to the deck
	} else if (input === "add" && input3 === undefined) {

		// sets counter to 0
		var count = 0;

		// Empty array to store cards
		var cards = [];

		var parse;

		// create card function
		function CreateCard(cloze, partial) {
			this.cloze = cloze;
			this.partial = " ..." + partial;
			this.full = cloze + " " + partial;
		} // End function CreateCard(cloze, partial)

		// gathers the data from the user about the flashcard
		var getInfo = function() {
			if (count < parseInt(input2)) {

				// npm install inquirer used to prompt the user for input
				inquirer.prompt([
				{
					name: "cloze",
					message: "What is the cloze deletion of the flashcard?"
				},
				{
					name: "partial",
					message: "What is the partial text of the flashcard?"

				// function for the answers for the flashcard
				}]).then(function(answers) {
					var card = new CreateCard(answers.cloze, answers.partial, answers.full);

					// Push the new card into the deck
					cards.push(card);
					// Next card
					count++;

					// Run the function again
					getInfo();
				}); // End .then(function(answers))

			} else {
				// variable to use JSON to parse out the data on the cards
				//  I couldn't think of a good, simple name for this variable
				var wow = JSON.parse(parse);
				// Push the parsed card data to the deck of cards
				cards.push.apply(cards, wow);

				fs.writeFile("clozelog.txt", JSON.stringify(cards), function(err) {
					if (err) {
						console.log(err);
					}; // End if (err)
				}); // End fs.writeFile("clozelog.txt, ...") 
			}; // End if else statement
		}; // End getInfo = function()
		getInfo();
		
		// Write the card to the appended log.txt file in the folder for this
		// program
		fs.readFile("clozelog.txt", "utf8", function(err, data) {

			// redundant error instructions
			if (err) {
				// log error if it exists
				console.log(err);

			// if no error exists, than parse the data
			} else {

				parse = data;

			}; // End if else statement
		}); // End fs.readFile("clozelog.txt", ...)

	// Once all the flashcards have been made, and the user command line argument for
	// 3 is read, and the command line argument 5 is front.  This set of code will
	// display one of the cards randomly
	} else if (input === "read" && input2 === "cloze") {

		// index variable to keep track of the parsed data
		var index = parseInt(input3) - 1;

		// run the cardFront function
		var cardFront = function () {

			// read the log.txt file and display it in a readable way 
			fs.readFile("clozelog.txt", "utf8", function(err, data) {

				// More error redundancies ;)
				if (err) {
					// log error if it exists
					console.log(err);

				// Otherwise, display the front of the card
				} else {
					// parsed variable
					var parsed = JSON.parse(data);

					console.log(" ");
					console.log("------------------------------------");
					console.log("Cloze Text: " + parsed[index].cloze);
					console.log("------------------------------------");
					console.log(" ");
				} // End if else statement
			}); // End fs.readFile("clozelog.txt", ...)
		}; // End cardFront = function()

		// run cardFront() function again for the next card
		cardFront();

	// Next portion for command line argument 2 as read and command line argument 3 as partial
	} else if (input === "read" && input2 === "partial") {

		// index variable
		var index = parseInt(input3) - 1;

		// function for the back of the card data
		var cardBack = function() {
			fs.readFile("clozelog.txt", "utf8", function(err, data) {

				// error function redundancies
				if (err) {
					// log error if it exists
					console.log(err);

				// Otherwise show the back of the card partial text 
				} else {
					var parsed = JSON.parse(data);
					// My attempt at making the data readable
					console.log(" ");
					console.log("-----------------------------------");
					console.log("Partial Text: " + parsed[index].partial);
					console.log("-----------------------------------");
					console.log(" ");

				} // End if else statement
			}); // End fs.readFile("clozelog.txt", ...)
		}; // End cardBack = function()

		// Run the card back function again for the next card.
		cardBack();

	// If the user inputs anything but, "first-add", "add", or "read", they will
	// be informed that their input is not valid and will be asked to try again
	} else {
		console.log("Not a Valid Command, Please Try Again!!!");
	} // if else statement
}; // End clozeFunction()

clozeFunction();

module.exports = clozeFunction;