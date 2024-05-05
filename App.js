const inputBox = document.getElementById('hero-field');
const searchBtn = document.getElementById('searchbtn');
const article1 = document.querySelector('.article-1');
const article2 = document.querySelector('.article-2');
const article3 = document.querySelector('.article-3');
const article4 = document.querySelector('.article-4');
const article5 = document.querySelector('.article-5');
const article6 = document.querySelector('.article-6');
const article7 = document.querySelector('.article-7');
const article8 = document.querySelector('.article-8');
const article9 = document.querySelector('.article-9');
const article10 = document.querySelector('.article-10');




async function searchNews(keyword){
    const api_key = '36aa796b2c524cf28829ff6e4b49ab6b';
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${api_key}`;

    const news_data = await fetch(`${url}`).then(response => response.json());
    console.log("run");
    article1.innerHTML = `${news_data.articles[0].description}`;
    article2.innerHTML = `${news_data.articles[1].description}`;
    article3.innerHTML = `${news_data.articles[2].description}`;
    article4.innerHTML = `${news_data.articles[3].description}`;
    article5.innerHTML = `${news_data.articles[4].description}`;
    article6.innerHTML = `${news_data.articles[5].description}`;
    article7.innerHTML = `${news_data.articles[6].description}`;
    article8.innerHTML = `${news_data.articles[7].description}`;
    article9.innerHTML = `${news_data.articles[8].description}`;
    article10.innerHTML = `${news_data.articles[9].description}`;
    console.log(news_data)
}


searchBtn.addEventListener('click',()=>{
   searchNews(inputBox.value);
});