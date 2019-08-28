/**
 * fetchDogs - Makes a fetch for dog JSON data.
 * @param {string} url
 * @return void
 */
function fetchDogs(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        const dogs = jsonData.dogs;
        resolve(dogs);
      });
  });
}

/**
 * createCard - Creates card container.
 * @param {string} name
 * @param {string} imageSrc
 * @return node
 */
function createCard({name, imageSrc}) {
  const card = document.createElement('DIV');
  card.classList.add('container__card');
  let bodyTemplate = `
    <div class="card__img-container">
      <img class="card__img" src="${imageSrc}" alt="${name}">
    </div>
    <div class="card__body">
      <p class="card-body__p">${name === undefined ? 'Needs a name' : name}</p>
    </div>
  `;
  bodyTemplate = bodyTemplate.trim();
  card.innerHTML = bodyTemplate;
  return card;
}

/**
 * renderGridList - renders grid list of dog cards to the page.
 * @param {object[]} dogs
 * @return void
 */
function renderGridList(dogs) {
  const hasGridItems = container.children.length > 0;
  const fragment = document.createDocumentFragment();
  const body = document.getElementsByTagName('body')[0];
  if (hasGridItems) container.innerHTML = '';

  for (let i = 0; i < dogs.length; i++) {
    const { name, image, source } = dogs[i];
    const smallImgSrc = `/photo?format=jpeg&width=640&imagePath=${image}`;
    const largeImgSrc = `/photo?format=jpeg&width=1280&imagePath=${image}`;
    const card = createCard({name, imageSrc: smallImgSrc});
    card.addEventListener('click', (event) => {
      overlay.style.display="unset";
      body.style.overflow="hidden";
      let modal = `
        <div id="modal">
          <img class="modal__img" src="${largeImgSrc}" alt="${name}">
        </div>
      `.trim();
      overlay.innerHTML = modal;
    });
    fragment.appendChild(card);
  }

  container.append(fragment);
}

/**
 * renderPagination - renders pagination to the page.
 * @param {start} number
 * @param {end} number
 * @param {currentPage} number
 * @return void
 */
function renderPagination(start, end, currentPage) {
  const paginationBtnContainer = document.querySelector('.pagination__btn-container');
  const fragment = document.createDocumentFragment();
  if (paginationBtnContainer.children.length > 0) paginationBtnContainer.innerHTML = '';

  for (let i = start; i <= end; i++) {
    let paginationBtn = document.createElement('div');
    paginationBtn.classList.add('pagination__btn');
    paginationBtn.innerHTML = `<a>${i}</a>`;
    paginationBtn.dataset.id = i;
    if (i === currentPage) {
      paginationBtn.classList.add('pagination__btn--active');
    }
    fragment.appendChild(paginationBtn);
  }

  paginationBtnContainer.append(fragment);
};

export {
  fetchDogs,
  createCard,
  renderGridList,
  renderPagination
}