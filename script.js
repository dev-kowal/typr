// inside script.js
// all of our quotes
// store the list of words and the index of the word the player is currently typing
let wpm = 0;
let words = [];
let wordIndex = 0;
let avgwpm;

if (localStorage.getItem('avgwpm') === null) {
  localStorage.setItem('avgwpm',30) 
}
avgwpm = localStorage.getItem('avgwpm');
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const avgwpmElement = document.getElementById('avgwpm');




messageElement.innerText = `WPM: 0`;
avgwpmElement.innerHTML = `averge WPM: ${avgwpm}`;

document.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
      document.getElementById("start").click();
    }
});

setTimeout(() => {document.getElementById("start").click();}, 1);

// at the end of script.js
document.getElementById('start').addEventListener('click', async () => {

  avgwpm = localStorage.getItem('avgwpm');
    // get a quote
    let cTF = true;
    let cTimer = 4;
    while (cTF == true) {
      cTimer -= 1;
      if (cTimer == 0) {
        cTF = false;
      }
      quoteElement.innerHTML = cTimer;
      await new Promise(r => setTimeout(r, 1000));
    }
    const quote = quotes();
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();

    messageElement.className = '';
    // Start the timer
    startTime = new Date().getTime();
  });

// at the end of script.js
typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = (new Date().getTime() - startTime)/60000;
      wpm = (words.length/elapsedTime).toFixed(0);
      const message = `WPM: ${wpm}`;
      messageElement.innerText = message;
      if (wpm > avgwpm) {
        messageElement.className = 'better';
      } else if (wpm < avgwpm) {
        messageElement.className = 'worse';
      } else {
        messageElement.className = '';
      }
      avgwpm = Math.floor((Number(avgwpm)+Number(wpm)+Number(lastwpm))/3);
      localStorage.setItem('avgwpm',avgwpm);
      avgwpmElement.innerHTML = `averge WPM: ${avgwpm}`;

      wpm = 0;
      
      typedValueElement.blur();
      typedValueElement.value = '';
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = 'input-box';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });