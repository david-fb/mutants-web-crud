import { END_POINTS } from '.';
import axios from 'axios';

export const getAllMutants = async () => {
  const res = await axios.get(END_POINTS.mutants.getAll());
  return res.data;
};

export const getMutantById = async (id) => {
  const res = await axios.get(END_POINTS.mutants.getById(id));
  return res.data;
};

export const createMutant = async (data) => {
  const res = await axios.post(END_POINTS.mutants.create(), { ...data });
  return res.data;
};

export const updateMutant = async (id, changes) => {
  const res = await axios.patch(END_POINTS.mutants.update(id), { ...changes });
  return res.data;
};

export const deleteMutant = async (id) => {
  const res = await axios.delete(END_POINTS.mutants.deleteById(id));
  return res.data;
};

export const getMutantByAny = async (query) => {
  const res = await axios.get(END_POINTS.mutants.getByAny(query));
  return res.data;
};
