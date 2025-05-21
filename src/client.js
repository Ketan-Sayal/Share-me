import {createClient} from '@sanity/client'
import imageUrlBuiler from '@sanity/image-url';

// Sanity part
export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  token: import.meta.env.VITE_SANITY_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
});

const builder = imageUrlBuiler(client);// Used to add crop and hotspot[which part of the image to be preserved] funcnality[automatically creates an url of cropped image]
export const urlFor = (source)=>builder.image(source);