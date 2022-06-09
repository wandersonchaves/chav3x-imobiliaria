import React from 'react'
import { PrismicText } from '@prismicio/react'

export const Quote = ({ slice }: any) => (
  <section className="content-section quote">
    <blockquote>
      <PrismicText field={slice.primary.quote_text} />
    </blockquote>
  </section>
)
