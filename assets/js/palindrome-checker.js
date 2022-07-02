/*
  Created by: Nigel Diaz
  Created on: June 30, 2022
  Last updated on: July 1, 2022
*/
//declaration of global variables
const txtInput = document.getElementById("txtInput");
const btnCheck = document.getElementById("btnCheck");
const btnClear = document.getElementById("btnClear");
const btnClearHistory = document.getElementById("btnClearHistory");
const message = document.getElementById("message");
const historyTable = document.getElementById("historyTable");
const history = [];
let historyItem = 0;
//add event listeners to buttons
btnCheck.onclick = check;
btnClear.onclick = reset;
btnClearHistory.onclick = clearHistory;
//returns true if input is a palindrome or false if not
function palindrome(str) {
  str = str.replace(/\W/g, ""); //remove non-alphanumeric characters
  str = str.replace("_", ""); //remove underscore
  str = str.toLowerCase(); //convert to lowercase

  const strReverse = []; //create an empty array
  //add each letter from string as an element in the array
  for (let letter = str.length-1; letter > -1; letter--) {
    strReverse.push(str[letter]);
  }

  var newStr = ""; //create empty string
  //reverse the string
  for (let letter = 0; letter < strReverse.length; letter++) {
    newStr += strReverse[letter];
  }
  
  //check if string is a palindrome
  if (str === newStr) {
    return true;
  }
  else {
    return false;
  }
}
//checks if input is a palindrome
function check() {
  let input = "";
  //txtInput.value = txtInput.value.toUpperCase();
  if(txtInput.value !== "") {
    input += txtInput.value;
    let isPalindrome = palindrome(input);
    if(isPalindrome) {
      var result = "is a palindrome";
      message.innerHTML = result.toUpperCase();
      addToHistory(input, result);
    }
    else{
      var result = "is not a palindrome";
      message.innerHTML = result.toUpperCase();
      addToHistory(input, result);
    }
  }  
}
//clears text input and message
function reset() {
  message.innerHTML = "";
  txtInput.value = ""; 
}
//adds word or sentence input to history
function addToHistory(str1, str2) {
  if(history.length <= 0 || history[history.length-1][0] !== str1) {
    historyItem++;
    //create new row
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "tr-"+historyItem)    
    historyTable.appendChild(tableRow);  
    const tr = document.getElementById("tr-"+historyItem);
    history.push([str1, tr]);
    //add word or sentence and result to row
    const wordOrSentence = document.createElement("td");
    if(str1.length > 22) {
      str1 = str1.substring(0, 22)+"...";
    }
    const wordOrSentenceNode = document.createTextNode(str1);
    wordOrSentence.appendChild(wordOrSentenceNode);
    const result = document.createElement("td");
    const resultNode = document.createTextNode(str2);
    result.appendChild(resultNode);
    tr.appendChild(wordOrSentence);  
    tr.appendChild(result); 
  } 
}
//clears history on screen
function clearHistory() {
  if(history.length > 0)
  {
    for (element = 0; element < history.length; element++) {
      history[element][1].remove();
    }
  }
}