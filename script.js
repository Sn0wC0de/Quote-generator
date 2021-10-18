const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const previousQuoteBtn = document.getElementById('previous-quote') ;
const nextQuoteBtn = document.getElementById('next-quote');
const historyTab = document.getElementById('history-tab');

let apiQuotes = [];
let quoteHistory = [];
let quoteCount = 0;

// Loading Spinner Shown
function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Remove Loading Spinner
function hideLoder() {
  quoteContainer.hidden = false;
  loader.hidden = true;
};
function addToQuoteHistory(string) { 
  quoteHistory.push(string);
};




function updateHistoryTab() {
  historyTab.innerHTML = '';
  quoteHistory.forEach(function (quote) {
    // item = JSON.stringify(item);

    let li = document.createElement('li');
    historyTab.appendChild(li);
    if (!quote.author) {
      authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.author;
    }
    li.textContent = `${quote.text} Author: ${quote.author}`;
  });
};


// Show New Quote
function newQuote() {
  showLoader();
  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  addToQuoteHistory(quote);
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  updateHistoryTab()
  hideLoder();
}



// show previous quote
function previousQuote() {
  showLoader();
  if (quoteHistory.length = 0) {
    return alert('no privious quotes')
  }
  const quote = quoteHistory[quoteHistory.length - quoteCount]; 

  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  
 

  hideLoder();
};
function nextQuote() {

}



// Get Quotes From API
async function getQuotes() {
  showLoader();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners

previousQuoteBtn.addEventListener('click', previousQuote);
newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes()