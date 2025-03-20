
import './App.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router';

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollToTop />
    </>
  );
}

