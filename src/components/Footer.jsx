import React from 'react';
import WebIcon from '../assets/WebIcon';
import GitHubIcon from '../assets/GitHubIcon';
import '../styles/Footer.css';

const LINKS = [
  {
    id: 'GitHub',
    title: 'GitHub',
    url: 'https://github.com/david-fb',
    icon: GitHubIcon,
  },
  {
    id: 'Web',
    title: 'Portfolio',
    url: 'https://www.davidbasto.dev/',
    icon: WebIcon,
  },
];

export default function Footer() {
  return (
    <footer className="Footer">
      <h3>Contact:</h3>
      <div>
        David Basto - davidbasto01@gmail.com
        <ul>
          {LINKS.map((item) => (
            <li key={item.id}>
              <a title={item.title} href={item.url} target="_blank" rel="noreferrer">
                <item.icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
