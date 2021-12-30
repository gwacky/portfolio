// Assignment Code
var generateBtn = document.querySelector("#generate");
var length = 0;
var possibleTypes = [];
var newPassword = '';

var lower = function() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
var upper = function() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
var number = function() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
var special = function() {
  var symb = "!@#$%^&*(){}[]=<>?,.";
  var possibleSymb = symb.split("")
  var index = Math.floor(Math.random() * ((possibleSymb.length-1) - 0 + 1)) + 0
  console.log(index)
  return possibleSymb[index]
}

var createPassword = function() {
  newPassword = "";
  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * (possibleTypes.length - 1) - 0 + 1);
    var type = possibleTypes[index].toLowerCase().trim()
    switch (type) {
      // case for special
      case 'special':
        newPassword += special();
        break;
      // case for numeric
      case 'number':
        newPassword += number();
        break;
      // case for uppercase letters
      case 'uppercase':
        newPassword += upper();
        break;
      // case for lowercase letters
      case 'lowercase':
        newPassword += lower();
        break;
    }
  }
  return newPassword;
};

// generator functions
var generatePassword = function() {
  var criteria = prompt("Which criteria would you like to include? Separate criteria with comma.\nLength \nCharacters")
  var options = criteria.split(',');
  console.log(options);
  // criteria loop
  for (var i = 0; i < options.length; i++) {
    var option = options[i].toLowerCase().trim()
    // switch criteria based on user input, Length and Characters
    switch (option) {
      //length criteria
      case 'length':
        var passwordLength = prompt("How many characters in your password? NOTE: No less than 8 characters, no more than 128 characters. Use numerical values.");
        // if password length is less than 8 or greater than 129, an error populates
        if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
        alert("You need to put a valid number!")
        return generatePassword();
        }
        else {
          length = passwordLength;
        }
        break
      //characters criteria
      case 'characters':
        var characters = prompt("Which character types would you like to include? Separate character types with a comma. \nSpecial, numeric, uppercase and/or lowercase.")
        // splitting character types into array
        if (characters.length) {
          var characterTypes = characters.split(",")
          for (var i = 0; i < characterTypes.length; i++) {
            var type = characterTypes[i].toLowerCase().trim();
            switch(type) {
              case 'special':
                possibleTypes.push("special")
                break;
              // case for numeric
               case 'number':
                possibleTypes.push("number")
                break;
              // case for uppercase letters
              case 'uppercase':
                possibleTypes.push("uppercase")
                break;
              // case for lowercase letters
              case 'lowercase':
                possibleTypes.push("lowercase")
                break;
            }
          }
          // restart function if invalid character is selected
          if (!possibleTypes.length) {
            alert("You must provide a valid character");
            return generatePassword();
          }
           
          // possibleTypes = characters.split(',')
        }
        else {
          //restart after alert
          alert("You need to select at least one valid option.")
          return generatePassword();
        }
      }
    }
  if (possibleTypes.length && length) {
    return createPassword();
  }
  else if (!possibleTypes.length && length) {
    possibleTypes = ["special", "number", "uppercase", "lowercase"]
    return createPassword();
  }
  else if (possibleTypes.length && !length) {
    length = Math.floor(Math.random() * (128 - 8) + 8);
    return createPassword();
  }
  else {
    alert("You haven't selected any valid options, a password has been created for you");
    possibleTypes = ["special", "number", "uppercase", "lowercase"]
    length = Math.floor(Math.random() * (128 - 8) + 8);
    return createPassword();
  }
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
