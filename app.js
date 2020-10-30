const corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
const apiToken = "?token=AcLSjAQ_mNzyJAwWt0MtUzfOrm1rTn5jgmrjD6mLbsY";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  const x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    // const query = `?q=${document.getElementById('search-input').value}`;
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

function handleSubmit() {
  corsPromise().then((request) => {
    request.onload = () => {
      const query = document.getElementById('search-input').value.toUpperCase();

      const response = JSON.parse(JSON.parse(JSON.stringify(request.response)));

      const resultsElement = document.getElementById('results-list');
      resultsElement.innerHTML = '';
      
      const filteredData = response.data.filter(d => d.common_name.toUpperCase().includes(query));
      const cards = filteredData.map(result => createResultCard(result));
      cards.forEach(c => resultsElement.appendChild(c));
      if (cards.length === 0) {
        resultsElement.textContent = 'No results found';
      }
    }
  });
}

// document.getElementById(‘id’)document.getElementById('color-description').removeAttribute('class');document.getElementById('color-description').setAttribute('class', 'big');
// document.getElementById('color-description').innerHTML = 'The color is green.';let card = document.createElement('div');document.getElementById('user-grid').appendChild(card);

function createResultCard(result) {
  const card = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = `${result.common_name} (${result.scientific_name})`;
  const img = document.createElement('img');
  img.src = result.image_url
  // const content = document.createElement('p');
  // content.textContent = ``

  card.appendChild(title);
  card.appendChild(img);
  return card;
}

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
