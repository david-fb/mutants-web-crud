import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

const LINKS = [
  {
    id: 1,
    title: 'Mutantes',
    url: '/',
    end: true,
  },
  {
    id: 2,
    title: 'Lugares',
    url: '/places',
    end: true,
  },
  {
    id: 3,
    title: 'Vehículos',
    url: '/vehicles',
    end: true,
  },
  {
    id: 4,
    title: 'Poderes',
    url: '/powers',
    end: true,
  },
];

export default function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav__menu">
        {LINKS.map((link) => (
          <li key={`menu-item-${link.id}`} className="Nav__menu">
            <NavLink to={link.url} end={link.end} className={({ isActive }) => (isActive ? 'Nav__menu__link-active' : undefined)}>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
