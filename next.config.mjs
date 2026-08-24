/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next optimises to WebP at quality 75 by default, which softens fine detail
    // like the text on the book cover. Anything other than 75 has to be declared
    // here first — the optimiser rejects qualities that are not on this list.
    qualities: [75, 95],
  },
};

export default nextConfig;
