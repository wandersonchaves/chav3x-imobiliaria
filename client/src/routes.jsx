import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LookItem } from './components/LookItem';
import { HomePage } from './pages/Home';
import { SaveLooks } from './pages/Looks/saveLooks';
import { Thanks } from './pages/Thanks';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/looks" element={<SaveLooks />} />
        <Route path="/looks/:uid" element={<LookItem />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </BrowserRouter>
  );
}
