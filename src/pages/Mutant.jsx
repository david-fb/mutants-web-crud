import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMutantById } from '../services/api/mutants';
import Layout from '../components/Layout';

export default function Mutant() {
  let { id } = useParams();
  const [mutant, setMutant] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getMutantById(id);
      setMutant(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <section>
        <Link to={'/'}>Volver</Link>
        <h1>Mutant {id}</h1>
        {mutant.alias}
        <img src={mutant.image} alt={mutant.name} />
      </section>
    </Layout>
  );
}
