import api from "./axios";

export const askAI = async (message: string) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};
