import '../styles/MutantsGrid.css';
import { Link } from 'react-router-dom';

export default function MutantsGrid({ mutants }) {
  return (
    <section className="MutantsGrid">
      {mutants.map((mutant) => (
        <Link to={`/mutant/${mutant.id}`} key={`mutant-${mutant.id}`} className="MutantsGrid__item">
          <img src={mutant.image} alt={mutant.name} />
          <div className="MutantsGrid__item-info">
            <h3>{mutant.alias}</h3>
            <p>{mutant.name}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
