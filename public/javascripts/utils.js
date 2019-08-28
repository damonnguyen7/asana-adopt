function fetchDogs(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        const dogs = jsonData.dogs;
        state.dogs = dogs;
        resolve(dogs);
      });
  });
}

function createCard({name, imageSrc}) {
  let card = document.createElement('DIV');
  card.classList.add('container__card');
  let bodyTemplate = `
    <div class="card__img-container">
      <img class="card__img" src="../${imageSrc}" alt="${name}">
    </div>
    <div class="card__body">
      <p class="card-body__p">${name === undefined ? 'Needs a name' : name}</p>
    </div>
  `;
  bodyTemplate = bodyTemplate.trim();
  card.innerHTML = bodyTemplate;
  return card;
}

function renderGridList(dogs) {
  const hasGridItems = container.children.length > 0;
  const fragment = document.createDocumentFragment();
  const body = document.getElementsByTagName('body')[0];
  if (hasGridItems) container.innerHTML = '';
  for (let i = 0; i < dogs.length; i++) {
    let dog = dogs[i];
    const { name, image, source } = dog;
    let card = createCard({name, imageSrc: image});
    card.addEventListener('click', (event) => {
      overlay.style.display="unset";
      body.style.overflow="hidden";
      let modal = `
        <div id="modal">
          <img class="modal__img" src="../${image}" alt="${name}">
        </div>
      `.trim();
      overlay.innerHTML = modal;
    });
    fragment.appendChild(card);
  }
  container.append(fragment);
}

function renderPagination(start, end) {
  const paginationBtnContainer = document.querySelector('.pagination__btn-container');
  const fragment = document.createDocumentFragment();
  if (paginationBtnContainer.children.length > 0) paginationBtnContainer.innerHTML = '';
  for (let i = start; i <= end; i++) {
    let paginationBtn = document.createElement('div');
    paginationBtn.classList.add('pagination__btn');
    paginationBtn.innerHTML = `<a>${i}</a>`;
    paginationBtn.dataset.id = i;
    if (i === state.pagination.currentPage) {
      paginationBtn.classList.add('pagination__btn--active');
    }
    fragment.appendChild(paginationBtn);
  }
  paginationBtnContainer.append(fragment);
};