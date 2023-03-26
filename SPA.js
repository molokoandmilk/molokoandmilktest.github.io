
//SPA

window.onhashchange = switchToStateFromURLHash;

const SPAState = {};
function switchToStateFromURLHash() {
    let URLHash = window.location.hash;
    let stateStr = URLHash.substr(1);
    console.log(stateStr)
    let pageHTML = "";
    switch (stateStr) {
        case 'Pagination':
            pageHTML += renderPagination();
            break;
        case 'Scroll':
            pageHTML += renderScroll();
            break;
    }
    document.getElementById('IPage').innerHTML = pageHTML;
}

function switchToState(newState) {
    let stateStr = newState.pagename;
    location.hash = stateStr;
}

function switchToPaginationPage() {
    switchToState({pagename: 'Pagination'});
}

function switchToScrollPage() {
    switchToState({pagename: 'Scroll'});
}

switchToStateFromURLHash();

function renderPagination() {
    return (
        `
           <div id='preloader' class="preloader-hidden">
              <img src="Spinner-1s-200px.gif" alt="preloader">
           </div>
           <div class="wrapper">
               <ul></ul>
           </div>
           <div class="item-container" id="item-container"></div>
           <div class="modal"></div>
           <div class="btn-up btn-up_hide"></div>
           `)
}

function renderScroll() {
    return (
        `
           <div id='preloader' class="preloader-hidden">
              <img src="Spinner-1s-200px.gif" alt="preloader">
           </div>
           <div class="item-container" id="item-container"></div>
           <div class="modal"></div>
           <div id="request-target"></div>
           <div class="btn-up btn-up_hide"></div>
`
    )
}









