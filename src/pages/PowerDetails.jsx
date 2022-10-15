import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPowerById } from '../services/api/powers';
import Layout from '../components/Layout';

export default function PowerDetails() {
  let { id } = useParams();
  const [power, setPower] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getPowerById(id);
      setPower(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <section>
        <Link to={'/powers'}>Volver</Link>
        <h1>Vehículo {id}</h1>
        {power.name}
      </section>
    </Layout>
  );
}
