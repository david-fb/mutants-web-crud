import { useState, useEffect } from 'react';
import { getMutantByAny } from '../services/api/mutants';
import SearchIcon from '../assets/SearchIcon';
import CloseIcon from '../assets/CloseIcon';
import '../styles/Search.css';

export default function Search() {
  const [query, setQuery] = useState('');

  const searchMutants = async () => {
    const res = await getMutantByAny(query);
    console.log(res);
  };

  useEffect(() => {
    if (!query) return;
    let timer = setTimeout(async () => {
      searchMutants();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => setQuery('');

  return (
    <div className="Search">
      <SearchIcon width={25} height={25} color="#727272" />
      <input type="text" name="mutantSearch" value={query} onChange={(e) => setQuery(e.target.value)} />
      {query && (
        <button onClick={handleClear}>
          <CloseIcon color="#727272" />
        </button>
      )}
    </div>
  );
}
