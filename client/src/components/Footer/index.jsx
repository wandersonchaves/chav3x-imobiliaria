import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="fixed bottom-3 left-3 text-gray-600">
    <p>
      All rights reserved CHAV3X
      <Link
        to="https://prismic.io"
        target="_blank"
        rel="noopener noreferrer"
      ></Link>
      <br />
    </p>
  </footer>
);
