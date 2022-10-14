import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getVehicleById } from '../services/api/vehicles';
import Layout from '../components/Layout';

export default function VehicleDetails() {
  let { id } = useParams();
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getVehicleById(id);
      setVehicle(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <section>
        <Link to={'/vehicles'}>Volver</Link>
        <h1>Vehículo {id}</h1>
        {vehicle.name}
      </section>
    </Layout>
  );
}
