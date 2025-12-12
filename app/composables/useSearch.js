import { useApi } from "./useApi";

export const useSearch = () => {
  const api = useApi();

  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const search = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/search.json", {
        params: { q: query.value },
      });
      results.value = response.data.docs || [];
    } catch (e) {
      error.value = "Error cargando datos.";
    }
    loading.value = false;
  };

  return { query, results, loading, error, search };
};
