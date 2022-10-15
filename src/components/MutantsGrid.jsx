import '../styles/MutantsGrid.css';
import { Link } from 'react-router-dom';

export default function MutantsGrid({ mutants }) {
  const items = mutants.map((mutant) => {
    const type = mutant?.type === 'hero' ? 'Héroe' : 'Villano';
    return (
      <Link to={`/mutant/${mutant.id}`} key={`mutant-${mutant.id}`} className="MutantsGrid__item">
        <img src={mutant.image} alt={mutant.name} />
        <div className="MutantsGrid__item-info">
          <p className="MutantsGrid__item-info__type">{type}</p>
          <h3 className="MutantsGrid__item-info__alias">{mutant.alias}</h3>
          <p className="MutantsGrid__item-info__name">{mutant.name}</p>
        </div>
      </Link>
    );
  });

  return <section className="MutantsGrid">{items}</section>;
}
