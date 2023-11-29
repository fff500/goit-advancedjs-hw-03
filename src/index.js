import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

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
    iziToast.error({
      message: 'Oops! Something went wrong! Try reloading the page!',
    });
  })
  .finally(() => {
    elements.loader.classList.add('display-none');
  });

function handleSelectChange(event) {
  elements.info.innerHTML = '';
  elements.loader.classList.remove('display-none');

  fetchCatByBreed(event.target.value)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      elements.info.innerHTML = `
        <img class="image" src="${url}" alt="${name}" />
        <div class="text-wrapper">
          <h1 class="name">${name}</h1>
          <p class="description">${description}</p>
          <p class="temperament"><b>Temperament:</b> ${temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Oops! Something went wrong! Try reloading the page!',
      });
    })
    .finally(() => {
      elements.loader.classList.add('display-none');
    });
}
