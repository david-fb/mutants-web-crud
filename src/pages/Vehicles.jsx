import { useState, useEffect } from 'react';
import { getAllVehicles, deleteVehicle } from '../services/api/vehicles';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Modal from '@mui/material/Modal';
import ModalVehicle from '../components/ModalVehicle';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [rows, setRows] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [pageSize, setPageSize] = useState(5);

  const getVehicles = async () => {
    const res = await getAllVehicles();
    setVehicles(res);
    setRows(res);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleOnChange = (e) => {
    const query = e.target.value;
    if (!query) {
      setRows(vehicles);
    } else {
      const result = vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(query.toLowerCase()));
      setRows(result);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedItem({});
    setIsEdit(false);
  };

  const handleEditClick = (params) => {
    setSelectedItem(params.row);
    setIsEdit(true);
    handleOpen();
  };

  const handleDeleteClick = (params) => {
    const itemId = params.row.id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicle(itemId)
          .then(() => {
            Swal.fire('Eliminado!', 'El item ha sido eliminado.', 'success');
            getVehicles();
          })
          .catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal!',
            });
            console.error(e);
          });
      }
    });
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    {
      field: 'action',
      headerName: 'Acciones',
      renderCell: (params) => (
        <div className="ActionButtons">
          <Link to={`/vehicles/${params.row.id}`}>Ver</Link>
          <button onClick={() => handleEditClick(params)}>Editar</button>
          <button onClick={() => handleDeleteClick(params)} className="DeleteButton">
            Eliminar
          </button>
        </div>
      ),
      width: 250,
    },
  ];

  return (
    <Layout>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-vehicle" aria-describedby="modal-vehicle-save-edit">
        <ModalVehicle isEdit={isEdit} handleClose={handleClose} vehicle={selectedItem} refreshVehicle={getVehicles} />
      </Modal>
      <article className="List__container">
        <h1 className="List__container__title">Vehículos</h1>
        <div className="List__container__control">
          <label>
            Buscar:
            <input type="text" name="vehicleSearch" onChange={handleOnChange} />
          </label>
          <button onClick={handleOpen}>Agregar</button>
        </div>
        <section className="List__container__table">
          <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 25]} pageSize={pageSize} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} />
        </section>
      </article>
    </Layout>
  );
}
