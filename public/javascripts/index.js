const overlay = document.querySelector('#overlay');
const body = document.getElementsByTagName('body')[0];
const paginationBtnContainer = document.querySelector('.pagination__btn-container');
const url = '../assets/data/dogs.json'; //Define location of data file here.
const { 
  fetchDogs, 
  createCard, 
  renderGridList, 
  renderPagination 
} = require('./utils');

let state = {
  dogs: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    start: undefined,
    end: undefined
  }
};

async function asyncRenderGridListAndPagination() {
  const dogs = await fetchDogs(url);
  const totalPages = Math.ceil(dogs.length / 12);
  state = {
    dogs,
    pagination: {
      currentPage: 1,
      totalPages,
      start: 1,
      end: totalPages <= 7 ? totalPages : 7
    }
  };

  renderGridList(dogs.slice(0, 12));
  renderPagination(1,  totalPages <= 7 ? totalPages : 7, 1);
}

overlay.addEventListener('click', (event) => {
  overlay.style.display="none";
  body.style.overflow="unset";
});

paginationBtnContainer.addEventListener('click', (e) => {
  const dogs = state.dogs;
  const paginationBtn = event.target.closest('.pagination__btn');
  const clickedPaginationBtn = paginationBtn !== null;
  const hasNotBeenClicked = state.pagination.currentPage !== paginationBtn.dataset.id;

  if (clickedPaginationBtn && hasNotBeenClicked) {
    window.scrollTo({top: 0});
    state.pagination.currentPage = Number(paginationBtn.dataset.id);
    if (state.pagination.currentPage <= state.pagination.totalPages) {
      if (state.pagination.currentPage < 7) {
        renderPagination(1,  state.pagination.totalPages <= 7 ? state.pagination.totalPages : 7, state.pagination.currentPage);
      } else {
        state.pagination.start = state.pagination.currentPage - 3;
        state.pagination.end = state.pagination.currentPage + 3 <= state.pagination.totalPages ? state.pagination.currentPage + 3 : state.pagination.totalPages;
        renderPagination(state.pagination.start,  state.pagination.end, state.pagination.currentPage);
      }
    }

    renderGridList(dogs.slice(state.pagination.currentPage * 12 - 12, state.pagination.currentPage * 12));
  }
});

asyncRenderGridListAndPagination();