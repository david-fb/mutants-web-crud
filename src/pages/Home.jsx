import { useState, useEffect } from 'react';
import { getAllMutants } from '../services/api/mutants';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function App() {
  const [mutants, setMutants] = useState({ count: 0, rows: [] });

  useEffect(() => {
    const getData = async () => {
      const res = await getAllMutants();
      setMutants(res);
    };
    getData();
  }, []);

  return (
    <Layout>
      <h1>Mutants</h1>
      <Search />
      <section>
        <Link to="/mutant/create">Agregar</Link>
        <MutantsGrid mutants={mutants.rows} />
      </section>
    </Layout>
  );
}

export default App;
