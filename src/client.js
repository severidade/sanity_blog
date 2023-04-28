import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: '70kqnxpw',
  dataset: 'production',
  // as informações acima estão no arquivo sanity.cli.js
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-04-27', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})