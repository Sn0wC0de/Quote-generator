const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');





let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}


// get quotes from API
function newQuote() {
    loading();
    // pisk a reandom quot
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author exist
    if(!quote.author) {
        authorText.textContent = 'unknown'
    } else{
        authorText.textContent = quote.author;
}
//check quote lenght for styling
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');

    }
    // set wuote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        // Catch Error Here
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}
    `;
    window.open(twitterUrl, '_blank');
}

// event listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();




