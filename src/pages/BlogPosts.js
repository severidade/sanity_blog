import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import { Link } from 'react-router-dom';

export default function BlogPosts() {
  const [postData, setPost ] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"] | order(publishedAt desc) {
        title,
        sub_title,
        slug,
        mainImage{
          asset-> {
            _id,
            url
          },
          alt
        },
        publishedAt
      }`)
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options)
      .replace(/(^|\s)de\s/g, '$1')
      .replace(date.getDate(), `<strong>${date.getDate()}</strong>`);
  }

  return(
    <main>
      <section>
        <h1>Blog Posts Página</h1>
        <h2>Bem vindo ao meu blog</h2>
        <div className='containar_posts'>
        {/* O operador && é usado para verificar se postData tem algum valor antes de executar o método map. Se postData for null ou undefined, a expressão retorna false e o método map não é executado, evitando possíveis erros. */}
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
                    <p>{post.sub_title}</p>
                  </span>
                  {/* <span className='post_date'>
                    {formatDate(post.publishedAt)}
                  </span> */}
                  <span className='post_date' 
                    dangerouslySetInnerHTML={{__html: formatDate(post.publishedAt)}}>
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