import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getMutantById, createMutant, updateMutant } from '../services/api/mutants';
import { getAllPlaces } from '../services/api/places';
import { getAllVehicles } from '../services/api/vehicles';
import { getAllPowers } from '../services/api/powers';
import CloseIcon from '../assets/CloseIcon';
import Layout from '../components/Layout';
import '../styles/CreateEditMutant.css';

export default function CreateEditMutant() {
  let { id } = useParams();
  const [mutant, setMutant] = useState({
    name: '',
    alias: '',
    type: '',
    condition: '',
    image: '',
    placeId: undefined,
    vehicleId: undefined,
    powers: [],
  });

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const [places, setPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [powers, setPowers] = useState([]);

  const powerRef = useRef();

  const getMutant = async () => {
    const res = await getMutantById(id);
    if (res.vehicleId === null) {
      res.vehicleId = undefined;
    }
    setMutant(res);
  };
  const getPlaces = async () => {
    const res = await getAllPlaces();
    setPlaces(res);
  };
  const getVehicles = async () => {
    const res = await getAllVehicles();
    setVehicles(res);
  };
  const getPowers = async () => {
    const res = await getAllPowers();
    setPowers(res.rows);
  };

  useEffect(() => {
    if (id) {
      getMutant();
      setIsEdit(true);
    }
    getPlaces();
    getVehicles();
    getPowers();
  }, []);

  const handleOnChange = (value, key) => {
    setMutant((state) => {
      return { ...state, [key]: value };
    });
  };

  const handleRemovePower = (id) => {
    setMutant((state) => {
      return {
        ...state,
        powers: state.powers.filter((item) => item.id !== id),
      };
    });
  };

  const handleAddPower = () => {
    const powerId = powerRef.current.value;
    const power = powers.filter((item) => item.id == powerId)[0];
    const hasPower = mutant.powers.some((item) => item.id === power.id);
    if (!hasPower) {
      setMutant((state) => {
        return {
          ...state,
          powers: [...state.powers, power],
        };
      });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const mutantData = {
      name: formData.get('name'),
      alias: formData.get('alias'),
      type: formData.get('type'),
      condition: formData.get('condition'),
      image: formData.get('image'),
      placeId: Number(formData.get('placeId')),
      vehicleId: formData.get('vehicleId') === 'false' ? null : Number(formData.get('vehicleId')),
      powersId: mutant.powers.map((item) => item.id),
    };

    if (isEdit) {
      await updateMutant(id, mutantData);
    } else {
      await createMutant(mutantData);
      navigate('/');
    }
  };

  return (
    <Layout>
      <section className="CreateEditMutant">
        <Link to={'/'}>Volver</Link>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={mutant.name} onChange={(e) => handleOnChange(e.target.value, 'name')} required />
          </label>

          <label>
            Alias:
            <input type="text" name="alias" value={mutant.alias} onChange={(e) => handleOnChange(e.target.value, 'alias')} required />
          </label>

          <label>
            Tipo:
            <select name="type" value={mutant.type} onChange={(e) => handleOnChange(e.target.value, 'type')} required>
              <option value="hero">Heroe</option>
              <option value="villain">Villano</option>
            </select>
          </label>

          <label>
            Condicion:
            <select name="condition" value={mutant.condition} onChange={(e) => handleOnChange(e.target.value, 'condition')} required>
              <option value="freedom">En Libertad</option>
              <option value="arrested">Arrestado</option>
              <option value="unknown">Desconocido</option>
            </select>
          </label>

          <label>
            Lugar:
            <select name="placeId" value={mutant.placeId} onChange={(e) => handleOnChange(e.target.value, 'placeId')} required>
              {places.map((place) => (
                <option key={`select-place-${place.id}`} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Vehículo:
            <select name="vehicleId" value={mutant.vehicleId} onChange={(e) => handleOnChange(e.target.value, 'vehicleId')}>
              <option value={false}>--</option>
              {vehicles.map((vehicle) => (
                <option key={`select-place-${vehicle.id}`} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Imagen:
            <input type="text" name="image" value={mutant.image} onChange={(e) => handleOnChange(e.target.value, 'image')} required />
          </label>

          <label>
            Poderes:
            <select name="vehicleId" ref={powerRef}>
              {powers.map((power) => (
                <option key={`select-power-${power.id}`} value={power.id}>
                  {power.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddPower}>
              Agregar
            </button>
          </label>

          <div>
            {mutant.powers.map((power) => (
              <span key={`mutant-power-${power.id}`}>
                {power.name}{' '}
                <button type="button" onClick={() => handleRemovePower(power.id)}>
                  <CloseIcon width={14} height={14} />
                </button>
              </span>
            ))}
          </div>

          <button type="submit">Guardar</button>
        </form>
      </section>
    </Layout>
  );
}
