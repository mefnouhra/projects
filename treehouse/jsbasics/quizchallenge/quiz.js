
function print(message) {
  document.write(message);
}

function listify(array){
  print("<ol>");
  for (x = 0; x < array.length; x++){
    print("<li>" + array[x] + "</li>");
  }
  print("</ol>");
}

var correctNum = 0;
var correctAnswers = [];
var wrongAnswers = [];

var quizQs = [
  ["What is the best color?", "RED"],
  ["Where was I born?", "ALEXANDRIA"],
  ["Who's the greatest?", "MEAGAN"]
];


for (x = 0; x < quizQs.length; x++){
  var answer = prompt(quizQs[x][0]);
  if (answer.toUpperCase() === quizQs[x][1]){
    correctAnswers.push(quizQs[x][0]);
    correctNum++;
  }
  else {
    wrongAnswers.push(quizQs[x][0]);
  }
}

//Print Calculation

if (correctNum > 1){
  print("You got " + correctNum + " questions right, bro!<br/><br/>")
}
else if (correctNum === 1){
  print("You got " + correctNum + " question right, bro!<br/><br/>")
}
else {
  print("You got every single question wrong, bro!<br/><br/>")
}


//Print Questions

if (correctAnswers.length === 0){
  print("You got these questions incorrect:");
  listify(wrongAnswers);
}

else if (wrongAnswers.length === 0){
  print("You got these questions correct:");
  listify(correctAnswers);
}
  
else {
  print("You got these questions correct:");
  listify(correctAnswers);
  print("You got these questions incorrect:");
  listify(wrongAnswers); 
}


