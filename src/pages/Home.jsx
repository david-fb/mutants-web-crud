import { useState, useEffect } from 'react';
import { getAllMutants, getMutantByAny } from '../services/api/mutants';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function App() {
  const [mutants, setMutants] = useState({ count: 0, rows: [] });
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');

  const searchMutants = async () => {
    const res = await getMutantByAny(query);
    setRows(res.rows);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getAllMutants();
      setMutants(res);
      setRows(res.rows);
    };
    getData();
  }, []);

  useEffect(() => {
    let timer;
    if (!query) {
      setRows(mutants.rows);
    } else {
      timer = setTimeout(async () => {
        searchMutants();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Layout>
      <h1 className="Home__title">mutantes</h1>
      <h2 className="Home__subtitle">Base de Datos</h2>
      <Search setQuery={setQuery} query={query} />
      <section className="Home__content">
        <Link className="Home__add-link" to="/mutant/create">
          Agregar
        </Link>
        <MutantsGrid mutants={rows} />
      </section>
    </Layout>
  );
}

export default App;
