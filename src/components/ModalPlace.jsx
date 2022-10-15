/* eslint-disable react/prop-types */
import React, { forwardRef, useRef } from 'react';
import { createPlace, updatePlace } from '../services/api/places';
import CloseIcon from '../assets/CloseIcon';
import '../styles/Modal.css';

const ModalPlace = forwardRef((props, ref) => {
  const form = useRef();

  const { handleClose, refreshPlace } = props;
  const isEdit = props.isEdit ?? true;
  const place = props.place ?? {};
  const title = isEdit ? 'Actualizar' : 'Agregar';

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(form.current);

    const placeData = {
      name: formData.get('name'),
    };

    try {
      if (isEdit) {
        await updatePlace(place.id, placeData);
        refreshPlace();
        handleClose();
      } else {
        await createPlace(placeData);
        refreshPlace();
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
      <h2>{title} Lugar</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="inputsContainer">
          <label>
            Nombre:
            <input type="text" name="name" defaultValue={place.name} required />
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

ModalPlace.displayName = 'ModalPlace';

export default ModalPlace;
