import { useState, useEffect } from 'react';
import { getAllVehicles } from '../services/api/vehicles';
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
        <Link to={`/vehicles/${params.row.id}`}>Ver</Link>
        <button>Edit</button>
        <button className="DeleteButton">Delete</button>
      </div>
    ),
    width: 210,
  },
];

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getAllVehicles();
      setVehicles(res);
      setRows(res);
    };
    getData();
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

  return (
    <Layout>
      <h1>Vehicles</h1>
      <div>
        <input type="text" name="vehicleSearch" onChange={handleOnChange} />
        <button>Agregar</button>
      </div>
      <div style={{ width: '800px', height: '600px' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
