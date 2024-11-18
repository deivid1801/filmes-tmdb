<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genres';

const genreStore = useGenreStore();
const isLoading = ref(false);
const tvShows = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const listTvShows = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genre: genreId,
      language: 'pt-BR',
    },
  })
  tvShows.value = response.data.results;
  isLoading.value = false;
}
</script>

<template>
  <div class="container">
    <h1>Gêneros de programas de TV</h1>
    <ul class="genre-list">
      <li v-for="genre in genreStore.genres" :key="genre.id" class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }" @click="listTvShows(genre.id)">
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="show-list">
      <div class="show-card" v-for="show in tvShows" :key="show.id">
        <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" :alt="show.title" />
        <div class="show-details">
          <p class="show-title">{{ show.name }}</p>
          <p class="show-original-name">{{ show.original_name }}</p>
          <p class="show-release-date">{{ formatDate(show.first_air_date) }}</p>
          <p class="show-genres" :class="{ active: genre_id === genreStore.currentGenreId }"><span v-for="genre_id in show.genre_ids" :key="genre_id" @click="listTvShows(genre_id)">{{ genreStore.getGenreName(genre_id) }}</span></p>
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
}

.genre-item {
  background-color: #b3854a;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  transition: 100ms ease-in-out;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #9b733f;
}

.show-list {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.show-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.show-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
}

.show-details {
  padding: 0 0.5rem;
}

.show-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3rem;
}

.show-genres {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.2rem;
}

.show-genres span {
  background-color: #4f8e9e;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: 100ms ease-in-out;
}

.show-genres span:hover {
  cursor: pointer;
  background-color: #427785;
}

.active {
  color: #b3854a;
  background-color: white;
  font-weight: bolder;
  box-shadow: 2px 2px 2px #0000003a;
}

.active:hover {
  background-color: #b3854a;
  color: white;
}

.movie-genres span.active {
  color: #b3854a;
  background-color: white;
  font-weight: bolder;
}
</style>
