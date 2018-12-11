// Create an array of songs
var song = ["master of puppets", "rock you like a hurricane", "black dog"];

// Setting wins, losses and number of tries
var win = 0;
var loss = 0;
var attempts = 9;
var correctLetter = [];
var wrongLetter = [];
var alreadyAttempted = [];

// Variables that hold the elements in the HTML
document.getElementById("wins").innerHTML = "Wins: " + win;
document.getElementById("losses").innerHTML = "Losses: " + loss;
var attemptsText = document.getElementById("counter");

playGame();

function playGame() {
    // Picking a random song
    var random = Math.floor(Math.random() * song.length);
    var chosenSong = song[random];

    // Replacing each letter with underscore
    titleUnderscore = chosenSong.replace(/[a-z]/gi, "_");
    console.log(titleUnderscore);

    // Displays the underscores on HTML file
    document.getElementById("title").innerHTML = titleUnderscore;

    // Gets user's guesses
    document.onkeyup = function (event) {

        // Determines which key the user pressed
        var userGuess = event.key;

        // Checking if the letter typed is correct
        if (chosenSong.indexOf(userGuess) > -1 && event.keyCode != 32) {

            // Puts all indexes of such a letter in an array
            var chosenWord = chosenSong;
            var specifiedLetter = userGuess;
            var individualLetters = chosenWord.split('');
            var matches = [];
            for (i = 0; i < individualLetters.length; i++) {
                if (individualLetters[i] == specifiedLetter)
                    matches[matches.length] = i;
            }

            console.log(matches);

            // Creating a function that replaces a character at a specific index
            String.prototype.replaceAt = function (index, replacement) {
                return this.substr(0, index) + replacement + this.substr(index + replacement.length);
            }

            // Function and a for loop to change those display those characters on page
            var replaceStr = chosenSong.indexOf(userGuess);
            for (i = 0; i < chosenSong.length; i++) {
                if (chosenSong[i] == userGuess) {
                    titleUnderscore = titleUnderscore.replaceAt(replaceStr, userGuess);
                }
            }
            console.log(titleUnderscore);
            document.getElementById("title").innerHTML = titleUnderscore;
            correctLetter.push(userGuess);
        }
        else {
            // Checks if a user already attempted such a letter
            if (alreadyAttempted.indexOf(userGuess) > -1) {
                document.getElementById("already-tried").innerHTML = "You Already Attempted This Key. Try Again";

                // Starts a timer that removes an alert after 5 seconds
                setTimeout(function () {
                    document.getElementById("already-tried").innerHTML = " ";
                }, 5000);
            }
            else {
                alreadyAttempted.push(userGuess);
                wrongLetter.push(" " + userGuess);
                console.log("wrong: " + wrongLetter);
                document.getElementById("guessed-letters").innerHTML = "Wrong Letters: " + wrongLetter;
                attempts--;
                attemptsText.innerHTML = "Attempts  Left: " + attempts;
                console.log(attempts);
                noGuessesLeft();
            }
        }
        
        function resetGame() {
            var attempts = 9;
            alreadyAttempted = [];
            attemptsText.innerHTML = "Attempts left: " + attempts;
            document.getElementById("guessed-letters").innerHTML = "Wrong Letters: " + wrongLetter;
            playGame();
        }
    
        function noGuessesLeft() {
            if (attempts === 0) {
                losses++;
                lossesText.innerHTML = "Losses: " + losses;
                resetGame();
            }
            else {
                return;
            }
        }
    }

    
}

