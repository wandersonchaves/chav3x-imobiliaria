import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="fixed bottom-3 left-3 text-gray-600">
    <p>
      All rights reserved &nbsp;
      <Link to="https://prismic.io" target="_blank" rel="noopener noreferrer">
        CHAV3X
      </Link>
      <br />
    </p>
  </footer>
);
