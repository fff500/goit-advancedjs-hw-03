export function fetchBreeds() {
  const URL = 'https://api.thecatapi.com/v1/breeds';

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || 'Error');
    }

    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY =
    'live_IPYLEuO65I8syQXtu4lbGRYsVk4VTtkV5G3Csy4a7jLj5CtLAaSsXLN6ZHWBHv37';

  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || 'Error');
    }

    return response.json();
  });
}
