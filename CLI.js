// CLI - Bringing Everything Together
// ================================================================================
var input = process.argv[2];
var fs = require('fs');

if (input === "basic") {
	var basic = require("./BasicCard.js");
	basic();
} else if (input === "cloze") {
	var cloze = require("./ClozeCards.js");
	cloze();
} else {
	console.log("The only functions recoginzed by this app are basic or cloze, Please Try Again!!");
} // End if else statement