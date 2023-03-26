//Modal


async function openModal(id) {

    const respCharacters = await fetch("https://rickandmortyapi.com/api/character" + "/"+id);
    const respDataCharacters  = await respCharacters.json()
    const respLocation = await fetch("https://rickandmortyapi.com/api/location" + "/"+id);
    const respDataLocation  = await respLocation.json()
    const respEpisode = await fetch("https://rickandmortyapi.com/api/episode" + "/"+id);
    const respDataEpisode  = await respEpisode.json()
    const modalEl = document.querySelector('.modal');
    modalEl.classList.add('modal--show');
    document.body.classList.add("stop-scrolling");
    modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__card-backdrop" src="${respDataCharacters.image}" alt="">
      <div>
        <span>Name: ${respDataCharacters.name}  </span>
        <span>Status: ${respDataCharacters.status}</span>
        <span>Species: ${respDataCharacters.species} </span>
        <span>Episode: ${respDataEpisode.episode} </span>
        <span>data: ${respDataEpisode.air_date} </span>
        <span>Origin: ${respDataLocation.name}</span>
        <span>Gender: ${respDataCharacters.gender} </span>
        <button type="button" class="modal__button-close">Закрыть</button>
      </div>
    </div>
  `
    const btnClose = document.querySelector(".modal__button-close");
    btnClose.addEventListener("click", () => closeModal());
    function closeModal() {
        modalEl.classList.remove("modal--show");
        document.body.classList.remove("stop-scrolling");
    }
    window.addEventListener("click", (e) => {
        if (e.target === modalEl) {
            closeModal();
        }
    })

    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            closeModal();
        }
    })
}

