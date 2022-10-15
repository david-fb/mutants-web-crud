import { useState, useEffect } from 'react';
import { getAllPlaces, deletePlace } from '../services/api/places';
import { Link } from 'react-router-dom';
import ModalPlace from '../components/ModalPlace';
import Modal from '@mui/material/Modal';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [rows, setRows] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [pageSize, setPageSize] = useState(5);

  const getPlaces = async () => {
    const res = await getAllPlaces();
    setPlaces(res);
    setRows(res);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const handleOnChange = (e) => {
    const query = e.target.value;
    if (!query) {
      setRows(places);
    } else {
      const result = places.filter((vehicle) => vehicle.name.toLowerCase().includes(query.toLowerCase()));
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
        deletePlace(itemId)
          .then(() => {
            Swal.fire('Eliminado!', 'El item ha sido eliminado.', 'success');
            getPlaces();
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
          <Link to={`/places/${params.row.id}`}>Ver</Link>
          <button onClick={() => handleEditClick(params)}>Edit</button>
          <button onClick={() => handleDeleteClick(params)} className="DeleteButton">
            Delete
          </button>
        </div>
      ),
      width: 210,
    },
  ];

  return (
    <Layout>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-place" aria-describedby="modal-place-save-edit">
        <ModalPlace isEdit={isEdit} handleClose={handleClose} place={selectedItem} refreshPlace={getPlaces} />
      </Modal>
      <h1>Lugares</h1>
      <div>
        <input type="text" name="" id="" onChange={handleOnChange} />
        <button onClick={handleOpen}>Agregar</button>
      </div>
      <div style={{ width: '500px', height: '400px' }}>
        <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 25]} pageSize={pageSize} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} />
      </div>
    </Layout>
  );
}
