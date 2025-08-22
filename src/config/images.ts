// Centralized image URLs configuration
// Replace these with your actual Cloudinary URLs after uploading

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const IMAGES = {
  // Hero/Background Images - Update these with your Cloudinary URLs
  hero: {
    landing: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/hero-landing.jpg`, // Replace with actual URL
    newspaperRoom: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/newsroom.jpg`, // Replace with actual URL
    potter: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/pottery-workshop.jpg`, // Replace with actual URL
    potter2: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/workshop-2.jpg`, // Replace with actual URL
    lightroom: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/lightroom.jpg`, // Replace with actual URL
  },
  
  // Museum/Program Images
  programs: {
    museum: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/museum.jpg`, // Replace with actual URL
    museumPhoto: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/museum-photo.jpg`, // Replace with actual URL
    museumChair: `${CLOUDINARY_BASE}/v1234567890/anyen-iyak/museum-chair.jpg`, // Replace with actual URL
  },
  
  // Fallback to local SVGs if Cloudinary URLs are not set
  fallback: {
    landing: '/images/landing.svg',
    newspaperRoom: '/images/newspaper_room.svg',
    potter: '/images/potter.svg',
    potter2: '/images/potter_2.svg',
    lightroom: '/images/lightroom.svg',
    museum: '/programs/museum.svg',
    museumPhoto: '/programs/museum_photo.svg',
    museumChair: '/programs/museum_chair.svg',
  }
};

// Helper function to get image URL with fallback
export const getImageUrl = (category: keyof typeof IMAGES.hero | keyof typeof IMAGES.programs, fallbackKey: keyof typeof IMAGES.fallback) => {
  const cloudinaryUrl = category in IMAGES.hero ? IMAGES.hero[category as keyof typeof IMAGES.hero] : IMAGES.programs[category as keyof typeof IMAGES.programs];
  
  // If Cloudinary URL contains placeholder version number, use fallback
  if (cloudinaryUrl.includes('v1234567890')) {
    return IMAGES.fallback[fallbackKey];
  }
  
  return cloudinaryUrl;
}; 