import Nav from './Nav';
import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="Main">{children}</main>
    </>
  );
}
