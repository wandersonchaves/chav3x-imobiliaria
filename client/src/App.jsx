import { PrismicProvider, PrismicToolbar } from '@prismicio/react';
import { Link } from 'react-router-dom';
import { Looks } from './pages/Looks';
import { client, repositoryName } from './prismic';
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
        {/* <PrismicToolbar repositoryName={repositoryName} /> */}
      </PrismicProvider>
    </div>
  );
}
export default App;
