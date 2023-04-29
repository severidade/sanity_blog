import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
// import project from '../../sanityblog/schemas/project.js';

export default function Projects() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "project"] | order(publishedAt desc) {
        title,
        data,
        place,
        description,
        projectType,
        link,
        tags
      }`)
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);
  return(
    <main>
      <section>
        <h1>Esta é a pagina de projetos</h1>
        <h2>Aqui listo meus projetos de destaque</h2>
        <section>
          {projectData && projectData.map((project,index) =>(
            <article>
              <a
                href={project.link}
                alt={project.title}
                target='_blank'
                rel="noopener noreffer noreferrer">
                  <h3>{project.title}</h3>
              </a>
              <div>
                {/* <span>
                  <strong>Finalizado em </strong>:{" "}
                  {new Date(project.date).toLocaleDateString()}
                </span> */}
                <span>
                  <strong>Localização</strong>:{" "}
                  { project.place }
                </span>
                <span>
                  <strong>Titpo</strong>:{" "}
                  { project.projectType }
                </span>
                <p>
                  { project.description }
                </p>
                <a
                  href={project.link}
                  alt={project.title}
                  target='_blank'
                  rel="noopener noreffer noreferrer">
                    Veja o projeto
                </a>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}