const container = document.getElementById("container");
const overlay = document.querySelector('#overlay');
const body = document.getElementsByTagName('body')[0];
const paginationBtnContainer = document.querySelector('.pagination__btn-container');
const url = '../assets/data/dogs.json';
let state = {
  dogs: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    start: undefined,
    end: undefined
  }
};

async function asyncRenderGridList() {
  const dogs = await fetchDogs(url);
  state = {
    dogs,
    pagination: {
      currentPage: 1,
      totalPages: Math.ceil(dogs.length / 12),
      start: undefined,
      end: undefined
    }
  }
  renderGridList(dogs.slice(0, 12));
  renderPagination(1,  state.pagination.totalPages <= 7 ? state.pagination.totalPages : 7);
}

overlay.addEventListener('click', (event) => {
  overlay.style.display="none";
  body.style.overflow="unset";
});

paginationBtnContainer.addEventListener('click', (e) => {
  const { dogs, pagination } = state;
  const { currentPage, totalPages, start, end } = pagination;
  const paginationBtn = event.target.closest('.pagination__btn');
  const previousPage = currentPage;
  state.pagination.currentPage = Number(paginationBtn.dataset.id);
  if (currentPage <= totalPages) {
    if (currentPage < 7) {
      renderPagination(1,  totalPages <= 7 ? totalPages : 7);
    } else {
      state.pagination.start = currentPage - 3;
      state.pagination.end = currentPage + 3 <= totalPages ? currentPage + 3 : totalPages;
      renderPagination(start,  end);
    }
  }
  renderGridList(dogs.slice(state.pagination.currentPage * 12 - 12, state.pagination.currentPage * 12));
});

asyncRenderGridList();