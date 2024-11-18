<script setup>
import { ref, onMounted } from 'vue'
import api from './plugins/axios'

const moviesGenres = ref([])
const TVGenres = ref([])

onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR')
  moviesGenres.value = response.data.genres
  response = await api.get('genre/tv/list?language-pt-BR')
  TVGenres.value = response.data.genres
})
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  display: flex;
  height: 3rem;
  background-color: black;
  padding-left: 2rem;
  font-size: 1.5rem;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
nav a {
  text-decoration: none;
  color: white;
}
</style>
