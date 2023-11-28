import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.select.classList.add('display-none');
elements.info.classList.add('display-none');
elements.error.classList.add('display-none');

elements.select.addEventListener('change', handleSelectChange);

fetchBreeds()
  .then(data => {
    elements.select.innerHTML = data
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    elements.select.classList.remove('display-none');
  })
  .catch(error => {
    console.error(error);
    elements.error.classList.remove('display-none');
  })
  .finally(() => {
    elements.loader.classList.add('display-none');
  });

function handleSelectChange(event) {
  elements.info.classList.add('display-none');
  elements.loader.classList.remove('display-none');

  fetchCatByBreed(event.target.value)
    .then(data => {
      console.log(data);
      elements.info.classList.remove('display-none');
    })
    .catch(error => {
      console.error(error);
      elements.error.classList.remove('display-none');
    })
    .finally(() => {
      elements.loader.classList.add('display-none');
    });
}
