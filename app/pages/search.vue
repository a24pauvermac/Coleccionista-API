<script setup>
import { useFavoritesStore } from "../stores/favoriteStore.js";
import { useSearch } from "../composables/useSearch";

const favoritesStore = useFavoritesStore();
const { query, results, loading, error, search } = useSearch();
</script>

<template>
  <h1>Search page</h1>
  <SearchBar v-model="query" @search="search" />

  <div v-if="loading">Cargando...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="results.length && !loading">
    <ItemCard v-for="book in results" :key="book.key" :item="book">
      <button @click="favoritesStore.addFavorite(book)">
        <i class="fa-solid fa-heart"></i>
      </button>
    </ItemCard>
  </div>
</template>

<style></style>
