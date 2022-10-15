import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuHamburguer from '../assets/MenuHambuger';
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
  const [open, setOpen] = useState(false);
  return (
    <nav className="Nav">
      <ul className="Nav__menu">
        {LINKS.map((link) => (
          <li key={`menu-item-${link.id}`} className="Nav__menu__item">
            <NavLink to={link.url} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="Nav__menu-mobile__container">
        <button onClick={() => setOpen(!open)}>
          <MenuHamburguer width={32} height={32} color="#fdcf02" />
        </button>
        {open && (
          <ul className="Nav__menu-mobile">
            {LINKS.map((link) => (
              <li key={`menu-mobile-item-${link.id}`} className="Nav__menu-mobile__item">
                <NavLink to={link.url} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
