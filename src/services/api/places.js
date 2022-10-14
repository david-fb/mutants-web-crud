import { END_POINTS } from '.';
import axios from 'axios';

export const getAllPlaces = async () => {
  const res = await axios.get(END_POINTS.places.getAll());
  return res.data;
};

export const getPlaceById = async (id) => {
  const res = await axios.get(END_POINTS.places.getById(id));
  return res.data;
};

export const createPlace = async (data) => {
  const res = await axios.patch(END_POINTS.places.create(), { ...data });
  return res.data;
};

export const updatePlace = async (id, changes) => {
  const res = await axios.patch(END_POINTS.places.update(id), { ...changes });
  return res.data;
};

export const deletePlace = async (id) => {
  const res = await axios.patch(END_POINTS.places.deleteById(id));
  return res.data;
};
