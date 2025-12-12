<script setup>
import { useFavoritesStore } from "../stores/favoriteStore.js";

const favoritesStore = useFavoritesStore();
</script>

<template>
  <h1>Libros Favoritos</h1>
  <div v-if="favoritesStore.favorites.length">
    <ItemCard
      v-for="libro in favoritesStore.favorites"
      :key="libro.key || libro.id"
      :item="libro"
    />
  </div>
  <p v-else>No hay libros favoritos aún</p>
</template>
