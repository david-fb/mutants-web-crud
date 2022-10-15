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
  places: {
    getAll: () => `${API_URL}/places/`,
    getById: (id) => `${API_URL}/places/${id}`,
    create: () => `${API_URL}/places/`,
    update: (id) => `${API_URL}/places/${id}`,
    deleteById: (id) => `${API_URL}/places/${id}`,
  },
  vehicles: {
    getAll: () => `${API_URL}/vehicles/`,
    getById: (id) => `${API_URL}/vehicles/${id}`,
    create: () => `${API_URL}/vehicles/`,
    update: (id) => `${API_URL}/vehicles/${id}`,
    deleteById: (id) => `${API_URL}/vehicles/${id}`,
  },
  powers: {
    getAll: () => `${API_URL}/powers/`,
    getById: (id) => `${API_URL}/powers/${id}`,
    create: () => `${API_URL}/powers/`,
    update: (id) => `${API_URL}/powers/${id}`,
    deleteById: (id) => `${API_URL}/powers/${id}`,
  },
};
