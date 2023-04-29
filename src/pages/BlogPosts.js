import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import { Link } from 'react-router-dom';

export default function BlogPosts() {
  const [postData, setPost ] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset-> {
            _id,
            url
          },
          alt
        }
      }`)
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return(
    <main>
      <section>
        <h1>Blog Posts Página</h1>
        <h2>Bem vindo ao meu blog</h2>
        <div className='containar_posts'>
          {postData && postData.map((post, index) =>(
            <article className='post'>
              <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                <span className='container_post'>
                  <figure className='container_img_post'>
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                    />
                  </figure>
                  <span className='post_title'>
                    <h3>{post.title}</h3>
                  </span>
                </span>
              </Link>
            </article>

          ))}
        </div>
      </section>
    </main>
  )
}