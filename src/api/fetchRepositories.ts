import { GITHUB_API_SEARCH, GITHUB_TOKEN } from "../constants/api"

const fetchRepositories = (query: string, page: string = '1') => fetch(`${GITHUB_API_SEARCH}?q=${query}&page=${page}&sort=stars&order=desc&per_page=100`, {
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      },
})

export default fetchRepositories