import axios from 'axios';
import Notiflix from 'notiflix';

// функція для забору порід

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(`Failed to fetch breeds: ${error}`);
    });
}

//  функція для забору породи по ід

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(`Failed to fetch breed: ${error}`);
    });
}
