<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  item: Object,
});
const router = useRouter();
function goToDetail() {
  // Navega usando solo el ID limpio
  const key = props.item.key?.replace("/works/", "");
  console.log("Navegando a detalle:", key);
  router.push(`/item/${key}`);
}
</script>

<template>
  <div class="item-card">
    <img
      v-if="item.cover_i"
      :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`"
      alt="Portada del libro"
    />
    <h2>{{ item.title }}</h2>
    <p v-if="item.author_name">Autor: {{ item.author_name.join(", ") }}</p>
    <p v-if="item.first_publish_year">Año: {{ item.first_publish_year }}</p>
    <button @click="goToDetail" title="Ver detalles" style="margin-left: 8px">
      <i class="fa-solid fa-plus"></i>
    </button>
    <slot></slot>
  </div>
</template>
