import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source)
}

export default function Home() {

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "author"]{
        name,
        bio,
        "authorImage": image.asset->url
      }`)
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if(!author) return <div>Carregendo...</div>;

  return(
    <main>
      <section>
        <figure className='container_image'>
          <img
            src={urlFor(author.authorImage).url()}
            alt={author.name}
          />
        </figure>
        <h1>{author.name}</h1>
        <div>
          <BlockContent blocks={author.bio}/>
        </div>
      </section>
    </main>
  )
}