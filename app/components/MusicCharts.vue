<script setup>
import { ref } from "vue";
import { useApi } from "../composables/useApi";
const query = ref("");

const results = ref([]);
const api = useApi();
const handleSearch = async () => {
  try {
    const res = await api.get(
      `/search.json?q=${encodeURIComponent(query.value)}`
    );
    // Ajusta el path según la estructura real de la respuesta
    results.value = res.data?.album || res.docs || [];
  } catch (e) {
    results.value = [];
  }
};
</script>
<template>
  <h1>Music Charts</h1>
  <input type="text" placeholder="buscant..." v-model="query" />
  <button @click="handleSearch">Search</button>

  <div v-if="results.length">
    <ItemCard
      v-for="libro in results"
      :key="libro.key || libro.id"
      :item="libro"
    />
  </div>
</template>
<h1>Libros Destacados</h1>
<input type="text" placeholder="buscando..." v-model="query" />
<button @click="handleSearch">Buscar</button>

<div v-if="results.length">
    <ItemCard v-for="libro in results" :key="libro.key || libro.id" :item="libro" />
  </div>
