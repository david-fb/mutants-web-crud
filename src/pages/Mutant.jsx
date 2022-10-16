import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMutantById, deleteMutant } from '../services/api/mutants';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import LeftArrow from '../assets/LeftArrow';
import '../styles/Mutant.css';

export default function Mutant() {
  let { id } = useParams();
  const [mutant, setMutant] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getMutantById(id);
        setMutant(res);
      } catch (error) {
        navigate('/');
      }
    };
    getData();
  }, []);

  const type = mutant?.type === 'hero' ? 'Héroe' : 'Villano';
  const condition = {
    freedom: 'En Libertad',
    arrested: 'Arrestado',
    unknown: 'desconocido',
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutant(id)
          .then(() => {
            Swal.fire('Eliminado!', 'El item ha sido eliminado.', 'success');
            navigate('/');
          })
          .catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal!',
            });
            console.error(e);
          });
      }
    });
  };

  return (
    <Layout>
      <article className="Mutant">
        <Link className="Mutant__Back-Link" to={-1}>
          <LeftArrow /> Volver
        </Link>
        <section className="Mutant__Content">
          <img src={mutant?.image} alt={mutant?.name} />
          <div className="Mutant__Content-details">
            <h1 className="Mutant__Content__title">{mutant?.alias}</h1>
            <h2 className="Mutant__Content__subtitle">{mutant?.name}</h2>
            <div className="Mutant__Content__info">
              <p>
                Tipo: <span className="Mutant__content__info-property">{type}</span>
              </p>
              <p>
                Lugar: <span className="Mutant__content__info-property">{mutant?.place?.name}</span>
              </p>
              <p>
                Condición: <span className="Mutant__content__info-property">{condition[mutant?.condition]}</span>
              </p>
              {mutant?.vehicle?.name && (
                <p>
                  Vehículo: <span className="Mutant__content__info-property">{mutant?.vehicle?.name}</span>
                </p>
              )}
              <h4>Poderes:</h4>
              <div className="Mutant__Content__info-powers">
                {mutant?.powers?.map((power) => (
                  <span key={`power-${power.id}`}>{power.name}</span>
                ))}
              </div>
            </div>
            <div className="Mutant__buttons">
              <Link to={`/mutant/edit/${id}`}>Editar</Link>
              <button onClick={handleDeleteClick}>Eliminar</button>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
