<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import { useGenreStore } from '@/stores/genres';

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results;
  isLoading.value = false;
}

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
</script>

<template>
  <div class="container">
    <h1>Gêneros de filmes</h1>
    <ul class="genre-list">
      <li v-for="genre in genreStore.genres" :key="genre.id" class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }" @click="listMovies(genre.id)">
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" :class="{ active: genre_id === genreStore.currentGenreId }" @click="listMovies(genre_id)"
              >{{ genreStore.getGenreName(genre_id) }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #4f8e9e;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  transition: 100ms ease-in-out;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #427785;
}

.movie-list {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3rem;
}

.movie-genres {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: #4f8e9e;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: 100ms ease-in-out;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #427785;
}

.active {
  color: #427785;
  background-color: white;
  font-weight: bolder;
  box-shadow: 2px 2px 2px #0000003a;
}

.active:hover {
  background-color: #427785;
  color: white;
}

.movie-genres span.active {
  color: #427785;
  background-color: white;
  font-weight: bolder;
}
</style>
