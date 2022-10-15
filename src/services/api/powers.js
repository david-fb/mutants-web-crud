import { END_POINTS } from '.';
import axios from 'axios';

export const getAllPowers = async () => {
  const res = await axios.get(END_POINTS.powers.getAll());
  return res.data;
};

export const getPowerById = async (id) => {
  const res = await axios.get(END_POINTS.powers.getById(id));
  return res.data;
};

export const createPower = async (data) => {
  const res = await axios.post(END_POINTS.powers.create(), { ...data });
  return res.data;
};

export const updatePower = async (id, changes) => {
  const res = await axios.patch(END_POINTS.powers.update(id), { ...changes });
  return res.data;
};

export const deletePower = async (id) => {
  const res = await axios.delete(END_POINTS.powers.deleteById(id));
  return res.data;
};
