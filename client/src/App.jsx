import { PrismicProvider } from '@prismicio/react';
import { Link } from 'react-router-dom';
import { client } from './prismic';
import { Router } from './routes';

function App() {
  return (
    <div>
      <PrismicProvider
        client={client}
        internalLinkComponent={({ href, ...props }) => (
          <Link to={href} {...props} />
        )}
      >
        <Router />
      </PrismicProvider>
    </div>
  );
}
export default App;
