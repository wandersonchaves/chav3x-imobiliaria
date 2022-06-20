import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LookPage } from './pages/LookPage';
import { HomePage } from './pages/Home';
import { Looks } from './pages/Looks';
import { Thanks } from './pages/Thanks';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/looks/:uid" element={<LookPage />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </BrowserRouter>
  );
}
