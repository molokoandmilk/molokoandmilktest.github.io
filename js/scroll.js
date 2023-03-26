//Scroll

const requestTarget = document.querySelector('#request-target');
const itemContainer = document.querySelector('#item-container');

const intersectionOptions = {
    threshold: 1
};
let apiUrl = 'https://rickandmortyapi.com/api/character';
let loading = false;

const onIntersect = ([entry]) => {
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}
function showLoader(){
    let preloader = document.getElementById('preloader');
    preloader.classList.remove('preloader-hidden')
}
function hideLoader(){
    let preloader = document.getElementById('preloader');
    preloader.classList.add('preloader-hidden')
}
const makeRequest = () => {
    loading = true;
    showLoader()
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            hideLoader()
            cleanUp(data.info.next);
            renderItems(data.results);
        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
}

const renderItems = results => {
    results.forEach(item => {
        itemContainer.appendChild(createItem(item));
    });
}

const createItem = item => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = (
        `
            <img class="char-img" src=${item.image} />
            <div class="char-name">${item.name}</div>
        `
    );
    newItem.addEventListener('click', ()=>openModal(item.id))
    return newItem;
}
let observer = new IntersectionObserver(onIntersect, intersectionOptions);
observer.observe(requestTarget);

