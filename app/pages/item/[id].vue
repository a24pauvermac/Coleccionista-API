<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useApi } from "~/composables/useApi";
import { useGemini } from "~/composables/useGemini";

//variables todas declaradas pero pertenecientes a usegemini
const { aiResponse, isGenerating, error: aiError, generateBookCuriosity } = useGemini();
//aqui solo las que pone use..() son las que pertenecen al composable, las demas son
//  variables que defino yo vacias para poder gestionar los v-ifs etc
const route = useRoute();
const api = useApi();
const book = ref(null);
const loading = ref(true);
const error = ref(null);

const descriptionText = computed(() => {
  if (!book.value || !book.value.description)
    return "Sin descripción disponible.";

  if (
    typeof book.value.description === "object" &&
    book.value.description.value
  ) {
    return book.value.description.value;
  }

  return book.value.description;
});

const coverImageUrl = computed(() => {
  if (book.value && book.value.covers && book.value.covers.length > 0) {
    const coverId = book.value.covers[0];
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
  return null;
});

onMounted(async () => {
  try {
    const workId = route.params.id;
    const res = await api.get(`/works/${workId}.json`);
    book.value = res.data || res;
  } catch (e) {
    console.error(e);
    error.value = "No se pudo cargar la información del libro.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="detail-container">
    <div v-if="loading" class="detail-loading">Cargando detalles...</div>

    <div v-else-if="error" class="detail-error">{{ error }}</div>

    <div v-else-if="book" class="detail-card">
      <div v-if="coverImageUrl" class="detail-cover">
        <img :src="coverImageUrl" :alt="`Portada de ${book.title}`" />
      </div>

      <div class="detail-content">
        <h1 class="detail-title">{{ book.title }}</h1>

        <p class="detail-description">
          {{ descriptionText }}
        </p>

        <p v-if="book.first_publish_year" class="detail-year">
          <strong>Publicado por primera vez:</strong>
          {{ book.first_publish_year }}
        </p>

        <div style="margin-top:2em;">
          <button
            @click="generateBookCuriosity(book.title)"
            :disabled="isGenerating || !book.title"
          >
            {{ isGenerating ? 'Pensando...' : 'Dato curioso!' }}
          </button>
          <p v-if="aiResponse">{{ aiResponse }}</p>
          <p v-if="aiError" class="detail-error">{{ aiError }}</p>
        </div>
      </div>
    </div>

    <div v-else class="detail-error">
      <p>No se encontró el libro.</p>
    </div>
  </div>
</template>