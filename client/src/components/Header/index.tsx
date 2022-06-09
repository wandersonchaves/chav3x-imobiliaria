import { PrismicText, PrismicLink } from '@prismicio/react';

const MenuLink = ({ menuLink }: any) => {
  return (
    <li>
      <PrismicLink field={menuLink.link}>
        <PrismicText field={menuLink.label} />
      </PrismicLink>
    </li>
  );
};

export function Header({ menuDoc }: any) {
  if (menuDoc) {
    return (
      <header className="site-header">
        {/* <PrismicLink href="/">
          <div className="logo">PMH</div>
        </PrismicLink> */}
        {/* <nav>
          <ul>
            {menuDoc.data.menu_links.map((menuLink) => (
              <MenuLink menuLink={menuLink} key={menuLink.link.id} />
            ))}
          </ul>
        </nav> */}
      </header>
    );
  }

  return null;
}
