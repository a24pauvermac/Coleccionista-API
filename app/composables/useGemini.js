import { ref } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const useGemini = () => {
  const aiResponse = ref("");
  const isGenerating = ref(false);
  const error = ref(null);

const generateBookCuriosity = async (bookTitle) => {
  isGenerating.value = true;
  error.value = null;
  aiResponse.value = "";

  try {
    //cambiamos la version de gemini que la otra se habia quedado obsoleta
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Dime una curiosidad interesante sobre el libro titulado "${bookTitle}". Máximo 40 palabras. Responde directamente con la curiosidad sin respuestas como "Claro" o afirmaciones parecidas a esta`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    aiResponse.value = response.text();
  } catch (e) {
    error.value = "No se pudo obtener la curiosidad.";
  } finally {
    isGenerating.value = false;
  }
};

return { aiResponse, isGenerating, error, generateBookCuriosity };
};