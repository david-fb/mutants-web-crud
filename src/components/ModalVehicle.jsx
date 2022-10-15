/* eslint-disable react/prop-types */
import React, { forwardRef, useRef } from 'react';
import { createVehicle, updateVehicle } from '../services/api/vehicles';
import CloseIcon from '../assets/CloseIcon';

const ModalVehicle = forwardRef((props, ref) => {
  const form = useRef();

  const { handleClose, refreshVehicle } = props;
  const isEdit = props.isEdit ?? true;
  const vehicle = props.vehicle ?? {};
  const title = isEdit ? 'Actualizar' : 'Agregar';

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(form.current);

    const placeData = {
      name: formData.get('name'),
    };

    try {
      if (isEdit) {
        await updateVehicle(vehicle.id, placeData);
        refreshVehicle();
        handleClose();
      } else {
        await createVehicle(placeData);
        refreshVehicle();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div tabIndex={props.tabIndex} onFocus={props.onFocus} ref={ref} className="Modal">
      <button className="CloseButton" onClick={handleClose}>
        <CloseIcon />
      </button>
      <h2>{title} Vehículo</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="inputsContainer">
          <label>
            Nombre:
            <input type="text" name="name" defaultValue={vehicle.name} required />
          </label>
        </div>
        <div className="buttonsContainer">
          <button className="CancelButton" onClick={handleClose} type="button">
            Cancelar
          </button>
          <button className="SaveButton">Guardar</button>
        </div>
      </form>
    </div>
  );
});

ModalVehicle.displayName = 'ModalVehicle';

export default ModalVehicle;
