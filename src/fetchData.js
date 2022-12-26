export function fetchData(key, query, page) {
  return fetch(
    `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  ).then(response => response.json());
}
