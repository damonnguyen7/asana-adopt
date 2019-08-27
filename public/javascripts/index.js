const container = document.getElementById("container");
const overlay = document.getElementById('overlay');
const body = document.getElementsByTagName('body')[0];
const url = '../assets/data/dogs.json';
const state = {
  dogs: []
};

async function asyncRenderGridList() {
  const dogs = await fetchDogs(url);
  renderGridList(dogs);
}

overlay.addEventListener('click', (event) => {
  overlay.style.display="none";
  body.style.overflow="unset";
});

asyncRenderGridList();