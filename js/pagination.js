//Pagination

const body = document.querySelector('body');
let allPages = 42;
let pageAPI=null;

function elem(allPages, page){
    let ul = document.querySelector('ul');
    let li = '';
    let beforePages = page - 1;
    let afterPages = page + 1;
    let liActive;
    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){

        if(pageLength > allPages){
            continue;
        }
        if(pageLength === 0){
            pageLength = pageLength + 1;
        }

        if(page === pageLength){
            liActive = 'active';
        }else{
            liActive = '';
        }

        li += `<li class="numb ${liActive}" onclick="elem(allPages, ${pageLength});getLi();getPosts(pageAPI)" >${pageLength}</li>`
    }

    ul.innerHTML = li;
}
elem(allPages, 1);

function getLi(){
    let liEl = document.querySelector('.numb.active')
    pageAPI = parseInt(liEl.textContent);
}

function showLoader(){
    let preloader = document.getElementById('preloader');
    preloader.classList.remove('preloader-hidden')
}
function hideLoader(){
    let preloader = document.getElementById('preloader');
    preloader.classList.add('preloader-hidden')
}

function getPosts(){
    showLoader()
    fetch('https://rickandmortyapi.com/api/character/?page='+pageAPI).then(res =>{
        return res.json();
    }).then (data => {
        hideLoader();
        generateHTML(data);
    }).catch(err=>{
        console.log(err)
    })
}

function generateHTML(myData){
    const itemContainer = document.querySelector('#item-container');
    itemContainer.innerHTML=''
    myData.results.forEach(item=>{
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = (
            `
            <img class="char-img" src=${item.image} />
            <div class="char-name">${item.name}</div>
        `
        );
        newItem.addEventListener('click', ()=>openModal(item.id))
        itemContainer.appendChild(newItem)
    })
}
getPosts(1)


