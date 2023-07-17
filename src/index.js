import './css/index.css';

import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import {
  hideCatInfo,
  hideLoader,
  showCatInfo,
  showLoader,
} from './js/show-hide';

axios.defaults.headers.common['x-api-key'] =
  'live_9NqclTXfmGTodwzdYBlm143IggNJWWZP3l6GuCYWRwL1QF9gexrkZqqqQd3uaLSZ';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .then(() => {
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => Notiflix.Notify.failure(error));

breedSelect.addEventListener('change', makeCatByBreed);

function makeCatByBreed() {
  const breedId = breedSelect.value;

  showLoader();
  hideCatInfo();
  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      showCatInfo();
      const catName = catData[0].breeds[0].name;
      const imgUrl = catData[0].url;
      const catDescr = catData[0].breeds[0].description;
      const catTemp = catData[0].breeds[0].temperament;

      const markUp = `
    
    <img src="${imgUrl}" alt="${catName} width="250" height="250" class="cat-img" loading="lazy">
    
    <div class="cat-data">
    <h2 class="cat-name">${catName}</h2>
    <p class="cat-text">${catDescr}</p>>
    <p class="cat-temperament">Temperament:${catTemp}</p>
    </div> `;

      catInfo.innerHTML = markUp;
    })
    .catch(error => Notiflix.Notify.failure(error));
}
