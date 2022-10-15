import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPowerById } from '../services/api/powers';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';

export default function PowerDetails() {
  let { id } = useParams();
  const [power, setPower] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getPowerById(id);
      console.log(res);
      setPower(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <article className="Details__container">
        <Link className="Details__back-link" to={-1}>
          Volver
        </Link>
        <h1 className="Details__container__title">{power.name}</h1>
        <p>Mutantes con el poder {power.name}:</p>
        <section className="Details__container__mutants">
          <MutantsGrid mutants={power?.mutants} />
        </section>
      </article>
    </Layout>
  );
}
