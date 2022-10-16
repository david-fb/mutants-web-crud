import Nav from './Nav';
import Footer from './Footer';
import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="Main">{children}</main>
      <Footer />
    </>
  );
}
