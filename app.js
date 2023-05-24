const apiAccessKey = "igW109zUYiqCpaxsN295w-Awl8D6IE2XLe3ZZ5G_e3g";

const formEl = document.querySelector('form');
const searchInput = document.getElementById('search-id');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.getElementById('show-more-btn');

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiAccessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map(result => {
        const description = result.alt_description;
        const discriptionOutput = description.charAt(0).toUpperCase() + description.slice(1);

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = discriptionOutput;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target= "_blank";
        imageLink.textContent = discriptionOutput;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if(page > 1) {
        showMoreBtn.style.display = 'block';
    }
}

formEl.addEventListener('submit', event => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', event => {
    searchImages();
})