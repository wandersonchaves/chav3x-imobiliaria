import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HousePage } from './pages/HousePage';
import { HomePage } from './pages/Home';
import { Houses } from './pages/Houses';
import { Congrats } from './pages/Congrats';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/houses/:uid" element={<HousePage />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </BrowserRouter>
  );
}
