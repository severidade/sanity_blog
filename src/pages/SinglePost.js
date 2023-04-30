import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
// nao consegui instalar o @sanity/block-content-to-react https://www.npmjs.com/package/@sanity/block-content-to-react

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source)
}

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      title,
      sub_title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url,
        }
      },
      body,
      "name": author->name,
      "authorImage": author->image
    }`).then((data) => setSinglePost(data[0])).catch(console.error);
  }, [slug]);

  if(!singlePost) return <div>Carregendo...</div>;

  console.log(singlePost.sub_title);

  return(
    <main>
      <article>
        <header>
          <div>
            <div>
              <div className='container_title'>
                <h1>{singlePost.title}</h1>
                <p>{singlePost.sub_title}</p>
              </div>
              <div className='container_author'>
                <img
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                />
                <p>{singlePost.name}</p>
              </div>
            </div>
          </div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
          />
        </header>
        <div className='container_post'>
          <BlockContent blocks={singlePost.body} projectId="70kqnxpw" dataset="production"/>
        </div>
      </article>
    </main>
  )
}
