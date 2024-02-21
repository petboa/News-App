let apiKey = "d8a73e43ecec4f75afb1e52476a403c1";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const options = ["general", "entertainment", "health", "science", "sports", "technology", ];

let requestURL;

const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg" }
        "alt=""/>
        </div> 
        <div class="news-content">
            <div class= news-title>${item.title}</div>
            <div class ="news-description">${item.description || item.content || ""}</div>
            <a href=" ${item.url} " target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
    }
};
const getNews = async() => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavialable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&language=en`
    e.target.classList.add("active");
    getNews();
};


const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${i=="general" ? "active" :""}"
        onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};


window.onload = () => {
    requestURL = `
            https://newsapi.org/v2/top-headlines?categrory=general&apiKey=${apiKey}&language=en`;
    init();
}