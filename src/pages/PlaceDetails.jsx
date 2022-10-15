import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlaceById } from '../services/api/places';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';
import '../styles/DetailsPages.css';

export default function PlaceDetails() {
  let { id } = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getPlaceById(id);
      setPlace(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <article className="Details__container">
        <Link className="Details__back-link" to={-1}>
          Volver
        </Link>
        <h1 className="Details__container__title">{place.name}</h1>
        <p>Mutantes que operan en {place.name}:</p>
        <section className="Details__container__mutants">
          <MutantsGrid mutants={place?.mutants} />
        </section>
      </article>
    </Layout>
  );
}
