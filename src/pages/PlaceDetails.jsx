import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlaceById } from '../services/api/places';
import Layout from '../components/Layout';

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
      <section>
        <Link to={'/places'}>Volver</Link>
        <h1>Place {id}</h1>
        {place.name}
      </section>
    </Layout>
  );
}
