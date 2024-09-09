import { Outlet } from 'react-router-dom';
import { Footer, Header, OfferBanner } from './components';
import { useSelector } from 'react-redux';
import 'react-toastify/ReactToastify.css';

function App() {
  const loginStatus = useSelector((state) => state.auth.status);

  return (
    <>
      <header className="sticky top-0 z-10 shadow">
        <OfferBanner />
        {loginStatus && <Header />}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
