<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "search"]);
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      @input="
        (e) => {
          console.log('[SearchBar] input:', e.target.value);
          emit('update:modelValue', e.target.value);
        }
      "
      @keyup.enter="
        () => {
          console.log('[SearchBar] enter pressed');
          emit('search');
        }
      "
      placeholder="buscant..."
    />
    <!-- Log botón search -->
    <button @click="emit('search')">Search</button>
  </div>
</template>

<style></style>
