import { END_POINTS } from '.';
import axios from 'axios';

export const getAllVehicles = async () => {
  const res = await axios.get(END_POINTS.vehicles.getAll());
  return res.data;
};

export const getVehicleById = async (id) => {
  const res = await axios.get(END_POINTS.vehicles.getById(id));
  return res.data;
};

export const createVehicle = async (data) => {
  const res = await axios.patch(END_POINTS.vehicles.create(), { ...data });
  return res.data;
};

export const updateVehicle = async (id, changes) => {
  const res = await axios.patch(END_POINTS.vehicles.update(id), { ...changes });
  return res.data;
};

export const deleteVehicle = async (id) => {
  const res = await axios.patch(END_POINTS.vehicles.deleteById(id));
  return res.data;
};
