import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGQwMDhjYjY0YTU3MjAzNDA3MThiNTk1NWU3M2I2YSIsIm5iZiI6MTY5NTEzMjIxMC40MjMsInN1YiI6IjY1MDlhYTMyOGE4OGIyMDBlMzlmNDZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B2pvnQ02JqS15PEUb02QmAn2aWkIxtY2QzLWDeAhBqs`,
    },
});

export default api;