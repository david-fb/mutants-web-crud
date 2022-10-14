import { useState, useEffect } from 'react';
import { getAllPlaces } from '../services/api/places';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Nombre', width: 150 },
  {
    field: 'action',
    headerName: 'Acciones',
    renderCell: (params) => (
      <div className="ActionButtons">
        <Link to={`/places/${params.row.id}`}>Ver</Link>
        <button>Edit</button>
        <button className="DeleteButton">Delete</button>
      </div>
    ),
    width: 210,
  },
];

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getAllPlaces();
      setPlaces(res);
      setRows(res);
    };
    getData();
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

  return (
    <Layout>
      <h1>Lugares</h1>
      <div>
        <input type="text" name="" id="" onChange={handleOnChange} />
        <button>Agregar</button>
      </div>
      <div style={{ width: '800px', height: '400px' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
