
function print(message) {
 var outputDiv = document.getElementById("output");
 outputDiv.innerHTML = message;
}

function listify(array){
  print("<ol>");
  for (x = 0; x < array.length; x++){
    print("<li>" + array[x] + "</li>");
  }
  print("</ol>");
}

var quizQs = [
  ["What is the best color?", "RED"],
  ["Where was I born?", "ALEXANDRIA"],
  ["Who's the greatest?", "MEAGAN"]
];
var correctNum = 0;
var correctAnswers = [];
var wrongAnswers = [];


for (x = 0; x < quizQs.length; x++){
  var answer = prompt(quizQs[x][0]);
  if (answer.toUpperCase() === quizQs[x][1]){
    correctAnswers.push(quizQs[x][0]);
    correctNum++;
  }
  else {
    wrongAnswers.push(quizQs[x][0]);
  };
}

if (correctNum > 1){
  print("You got " + correctNum + " questions right!<br/><br/>")
}
else if (correctNum === 1){
  print("You got " + correctNum + " question right!<br/><br/>")
}
else {
  print("You got no questions right!<br/><br/>")
}

print("You got these questions correct:");
listify(correctAnswers);


print("You got these questions incorrect:");
listify(wrongAnswers);


