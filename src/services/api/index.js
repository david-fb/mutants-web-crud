const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/api/v1`;

export const END_POINTS = {
  mutants: {
    getAll: () => `${API_URL}/mutants/`,
    getById: (id) => `${API_URL}/mutants/${id}`,
    getByAny: (query) => `${API_URL}/mutants/search?query=${query}`,
    create: () => `${API_URL}/mutants/`,
    update: (id) => `${API_URL}/mutants/${id}`,
    deleteById: (id) => `${API_URL}/mutants/${id}`,
  },
};
