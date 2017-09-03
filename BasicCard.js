// FlashCard Generator
// Basic FlashCards
// =================================================================================
//
// Global Variables
// require file system
var fs = require('fs');
// npm install inquirer
var inquirer = require('inquirer');
// User arguments
var input = process.argv[3];
var input2 = process.argv[4];
var input3 = process.argv[5];

// everything below this line is a part of this basic function
// for a user to create their own flashcard
function basicFunction() {

	// if the first input argument is random and command line argument 5 is undefined
	// If the user is not creating any more flash cards, this will generate a random
	// flashcard from the pile of created flashcards
	if (input === 'random' && input3 === undefined) {

		// Runs the function to view the front and back of a created flashcard
		function CreateCard(front, back) { 

			// this function used to create the front of the card
			this.front = front;
			// and the back of the card
			this.back = back;

		} // End function CreateCard

		// uses file system to read in file to log.txt
		fs.readFile("log.txt", "utf8", function(err, data) {

			// if there is an error then log the error
			if (err) {
				console.log(err);
				// if no error occors, than define the flash card
				// and count the cards
			} else {
				// cards variable uses JSON to parse data
				var cards = JSON.parse(data);

				// counter begins at 0
				var count = 0;

				// counter function to set time limit for flashcard game
				function counter() {

					if (counter <= cards.length) {
						// run the cardFront function written below

						cardFront();
						// counts cards, adds one second
						counter++;

						// timeout function gives 6000 miliseconds or 6 seconds for each card
						setTimeout(function() { counter() }, 6000);

					} // End if statement

				}; // End function counter()

				// function to show the front of the card
				function cardFront() {

					// random card as determined mathematically
					var randomCard = Math.floor(Math.random() * (cards.length));

					// trying to make the output pretty :)
					console.log("    ");
					console.log("-------------------------------");
					console.log("Front: " + cards[randomCard].front);

					// timeout function to view the back of the card
					setTimeout(function() {console.log("Back: " + 
						cards[randomCard].back) }, 5000);
					setTimeout(function() {console.log("---------------------"), 
						console.log(" "), cards.splice(randomCard, 1); }, 5100);

				}; // End function cardFront()
				counter();

			} // End if else statment
		}); // End fs.readFile() & function(err, data)

	// For the first flash card added to the pile
	// else if the command line argument 2 is defined as first-add and command line
	// argument 5 is undefined, run this set of commands
	} else if (input === "first-add" && input3 === undefined) {

		// resets card count to 0
		var count = 0;

		// empty card array
		var cards = [];

		// card creating function again, for front and back
		function CreateCard(front, back) {
			this.front = front;
			this.back = back;
		} // End function createCard

		// If the user is adding cards to the pile, than the function getInfo is used
		// to get the info for the card
		var getInfo = function() {
			if (count< parseInt(input2)) {

				// uses the npm inquirer install to prompt the user for the data 
				// required to make a flashcard
				inquirer.prompt([{

					// Since these are not Cloze cards, the flashcards will ask a 
					// question on the front side of the card
					name: "front",
					message: "What is the front of the flashcard?"
				}, {

					// And the back of the card will be give the answer to the question
					// on the front of the card.
					name: "back", 
					message: "What is the back of the flashcard?"

					// then(funciton(answers)) determines which of the sides contains
					// the answer for the respecitve flashcard
				}]).then(function(answers) {

					// The variable card pulls a new card from the deck
					var card = new CreateCard(answers.front, answers.back);

					// Pushes the card to the user
					cards.push(card);

					// it progresses by one card
					count++;

					// and runs the getInfo function
					getInfo();
				}); // End .then(function(answers))

			} else {

				// Appends the file using the filesystem to the log.txt file attached
				// to this folder
				fs.appendFile("log.txt", JSON.stringify(cards), function(err) {

					// Error function
					if (err) {

						// logs an error if one exists
						console.log(err);

					} // End if
				}); // End fs.appendFile() & function(err)
			}; // End else
		}; // End getInfo = function()

		// Run the getInfo Function
		getInfo();
	
	// If command line argument 2 input requests to add a card and the command line
	// argument 5 is undefined, than run through these lines
	} else if (input === "add" && input3 === undefined) {

		// card count begins at 0
		var count = 0;

		// empty flashcard array
		var cards = [];

		// parse variable
		var parse;

		// card creating function for this iteration
		function CreateCard(front, back) {

			// this function to define the front of the card
			this.front = front;

			// and the back of the card
			this.back = back;

		} // End function CreateCard
	

	//  We have to basically build the same function we did before, but since it is
	// contained within the else if(add) line.  I realize there may be a more efficient
	// way of writing this, but I am still trying to figure all of that out
	var getInfo = function() {

		// If the count is less than the parsedInt of the command line argument 5
		if (count < parseInt(input2)) {

			// than run the inquirer prompt to build a new flash card
			inquirer.prompt([
			{
				// Ask a question on the front of the flash card
				name: "front",
				message: "What is the front of the flashcard?"
			},
			{	
				// Get the answer on the back of the flash card
				name: "back",
				message: "What is the back of the flashcard?"
				// answers function to 
			}]).then(function(answers) {

				// push a new card into the deck of cards
				var card = new CreateCard(answers.front, answers.back);
				cards.push(card);

				// count them as they are entered in
				count++;

				// run the getInfo function again untill we have all the cards we need
				getInfo();
			}); // End .then(function(answer))
		} else {

			// variable to use JSON to parse out the data on the cards
			//  I couldn't think of a good, simple name for this variable
			var wow = JSON.parse(parse);
			// Push the parsed card data to the deck of cards
			cards.push.apply(cards, wow);

			// Write the card to the appended log.txt file in the folder for this
			// program
			fs.writeFile("log.txt", JSON.stringify(cards), function(err) {
				// as with every other function that I write there are lots of

				// redundant error instructions
				if (err) {

					// logs error if one exists
					console.log(err);

				} // End if (err)
			}); // End fs.writeFile() & function(err)
		}; // End if else statments
	}; // End getInfo function
	// Run the getInfo function again, until we have made all the cards that are needed

	// for this deck of flashcards
	getInfo();
	// read the log.txt file appended to this program
	fs.readFile("log.txt", "utf8", function(err, data) {

		// More error redundancies
		if (err) {
			// Logs errors when they exist
			console.log(err);

			// if no error exists, than parse the data
		} else {
			parse = data;

		} // End if else statments
	}) // End fs.readFile() & function(err, data)

	// Once all the flashcards have been made, and the user command line argument for
	// 3 is read, and the command line argument 5 is front.  This set of code will
	// display one of the cards randomly
	} else if (input === "read" && input2 === "front") {

		// index variable to keep track of the parsed data
		var index = parseInt(input3) - 1;

		// run the cardFront function
		var cardFront = function() {

			// read the log.txt file and display it in a readable way 
			fs.readFile("log.txt", "utf8", function(err, data) {

				// More error redundancies ;)
				if (err) {
					// Logs the error if it exists
					console.log(err);

					// Otherwise, display the front of the card
				} else {
					// parsed variable
					var parsed = JSON.parse(data);
					// My attempt to make it look good and readable
					console.log(" ");
					console.log("---------------------------");
					console.log("Front: " + parsed[index].front);
					console.log("---------------------------");
					console.log(" ");
				} // End if else statment
			}); // End fs.readFile() & function(err, data)
		}; // End var cardFront = function()

		// Run the cardFront function again, till we run out of cards
		cardFront();

		// if the user wants to read the back of the card
	} else if (input === "read" && input2 === "back") {
		// index variable to parse the input
		var index = parseInt(input3) - 1;

		// Function for the back of the flash card
		var cardBack = function () {

			// Read the data from the log.txt file
			fs.readFile("log.txt", "utf8", function(err, data) {
				// More error redundancies :( :| :)
				if (err) {
					// Logs the error if one exists
					console.log(err);

					// Display the back of the card
				} else {
					var parsed = JSON.parse(data);
					// Again, my attempt to make things look good and readable
					console.log(" ");
					console.log("----------------------------");
					console.log("Back: " + parsed[index].back);
					console.log("----------------------------");
					console.log(" ");
				} // End if else
			}); // End fs.readFile() & function(err, data)
		}; // End else if ()
		// Run the cardBack function again for the next card
		cardBack();

	// If the user inputs anything but, "first-add", "add", or "read", they will
	// be informed that their input is not valid and will be asked to try again
	} else {

		console.log("This is not a valid command, Please Try Again!")
	};

}; // End basicFunction()

module.exports = basicFunction;