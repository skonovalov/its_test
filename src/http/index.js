import { API_KEY, API_URL, MAX_RESULTS } from '../config'

export function getVideos (queryString, pageToken) {
  return fetch(`${API_URL}/search?part=snippet&maxResults=${MAX_RESULTS}&pageToken=${pageToken}&q=${queryString}&key=${API_KEY}`).then(res => res.json())
}

export function getVideo (id) {
  return fetch(`${API_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`).then(res => res.json())
}