<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'

const isLoading = ref(false)
const genres = ref([])

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
})

const tvShows = ref([])

const listTvShows = async (genreId) => {
  isLoading.value = true
  const response = await api.get('discover/tv', {
    params: {
      with_genre: genreId,
      language: 'pt-BR',
    },
  })
  tvShows.value = response.data.results
  isLoading.value = false
}
</script>

<template>
  <div class="container">
    <h1>Gêneros de programas de TV</h1>
    <ul class="genre-list">
      <li v-for="genre in genres" :key="genre.id" class="genre-item" @click="listTvShows(genre.id)">
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
          <p class="show-release-date">{{ show.first_air_date }}</p>
          <p>{{ show.genre_ids }}</p>
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
</style>
