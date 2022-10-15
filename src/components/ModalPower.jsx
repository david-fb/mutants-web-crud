/* eslint-disable react/prop-types */
import React, { forwardRef, useRef } from 'react';
import { createPower, updatePower } from '../services/api/powers';
import CloseIcon from '../assets/CloseIcon';

const ModalPower = forwardRef((props, ref) => {
  const form = useRef();

  const { handleClose, refreshPower } = props;
  const isEdit = props.isEdit ?? true;
  const power = props.power ?? {};
  const title = isEdit ? 'Actualizar' : 'Agregar';

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(form.current);

    const powerData = {
      name: formData.get('name'),
    };

    try {
      if (isEdit) {
        await updatePower(power.id, powerData);
        refreshPower();
        handleClose();
      } else {
        await createPower(powerData);
        refreshPower();
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
      <h2>{title} Poder</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="inputsContainer">
          <label>
            Nombre:
            <input type="text" name="name" defaultValue={power.name} required />
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

ModalPower.displayName = 'ModalPower';

export default ModalPower;
