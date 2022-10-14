import { useState, useEffect } from 'react';
import { getAllMutants } from '../services/api/mutants';
import MutantsGrid from '../components/MutantsGrid';
import Layout from '../components/Layout';
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
      <MutantsGrid mutants={mutants.rows} />
    </Layout>
  );
}

export default App;
