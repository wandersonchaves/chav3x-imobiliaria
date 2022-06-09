import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react';

const GalleryItem = ({ item }: any) => {
  return (
    <div className="gallery-item">
      <img src={item.image.url} alt={item.image.alt} />
      <PrismicRichText field={item.image_description} />
      <p className="gallery-link">
        <PrismicLink field={item.link}>
          <PrismicText field={item.link_label} />
        </PrismicLink>
      </p>
    </div>
  );
};

export const ImageGallery = ({ slice }: any) => {
  return (
    <section className="image-gallery content-section">
      <PrismicRichText field={slice.primary.gallery_title} />
      <div className="gallery">
        {slice.items.map((item: any) => (
          <GalleryItem key={item.image.url} item={item} />
        ))}
      </div>
    </section>
  );
};
