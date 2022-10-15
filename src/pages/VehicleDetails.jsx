import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getVehicleById } from '../services/api/vehicles';
import { useNavigate } from 'react-router-dom';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';

export default function VehicleDetails() {
  let { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getVehicleById(id);
        setVehicle(res);
      } catch (error) {
        navigate('/');
      }
    };
    getData();
  }, []);

  return (
    <Layout>
      <article className="Details__container">
        <Link className="Details__back-link" to={-1}>
          Volver
        </Link>
        <h1 className="Details__container__title">{vehicle.name}</h1>
        <p>Mutantes que manejan el vehículo {vehicle.name}:</p>
        <section className="Details__container__mutants">
          <MutantsGrid mutants={vehicle?.mutants} />
        </section>
      </article>
    </Layout>
  );
}
