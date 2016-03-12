var question1 = "Decaf or regular?";
var question2 = "Chocolate or vanilla?";
var question3 = "Micro or macro?";
var question4 = "White or wheat?";
var question5 = "Tourist or traveler?";

var score = 0;

var answer1 = prompt(question1);

if (answer1.toUpperCase() === 'REGULAR'){
  alert("Need my caffeine!");
  score++;
} else if (answer1.toUpperCase() === "DECAF"){
  alert("Decaf is gross.");
} else {
  alert("You're wrong.");
}

var answer2 = prompt(question2);

if (answer2.toUpperCase() === "CHOCOLATE"){
  alert("Chocolate is the greatest ever");
  score++;
} else if (answer2.toUpperCase() === "VANILLA"){
  alert("Ewwwwwww, you're so vanilla");
} else {
  alert("You're wrong."); 
}

var answer3 = prompt(question3);

if (answer3.toUpperCase() === "MICRO"){
  alert("Local is always better");
  score++;
} else if (answer3.toUpperCase() === "MACRO") {
  alert("Get yourself a Budweiser, you're wrong.");
} else {
  alert("You're wrong."); 
}

var answer4 = prompt(question4);

if (answer4.toUpperCase() === "WHEAT"){
  alert("Get your grains in");
  score++;
} else if (answer4.toUpperCase() === "WHITE") {
  alert("Enriched flour? Really?");
} else {
  alert("You're wrong."); 
}

var answer5 = prompt(question5);

if (answer5.toUpperCase() === "TRAVELER"){
  alert("Not all those who wander are lost");
  score++;
} else if (answer5.toUpperCase() === "TOURIST") {
  alert("Ugly American over here.");
} else {
  alert("You're wrong."); 
}

document.write("<p>You got " + score + " right out of 5</p>");

if (score > 4){
  document.write("<p>You get the gold crown!</p>")
} else if (score > 2){
  document.write("<p>You get a silver crown!</p>") 
} else if (score > 0) {
  document.write("<p>You get a bronze crown!</p>") 
} else {
  document.write("<p>You don't even get a crown cuz you're stupid.</p>")
}
          
