import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: []
  }),

  actions: {
    addFavorite(item) {
      this.favorites.push(item);
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(f => f.id !== id);
    }
  },

  getters: {
    isFavorite: (state) => (id) => state.favorites.some(f => f.id === id)
  }
});