// Cloudinary Image Optimization Utility

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: 'auto:low' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
  gravity?: 'auto' | 'face' | 'center';
}

interface ResponsiveBreakpoints {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

/**
 * Optimizes a Cloudinary image URL with transformations
 */
export const optimizeCloudinaryImage = (
  cloudinaryUrl: string, 
  options: ImageOptions = {}
): string => {
  const {
    width,
    height,
    quality = 'auto:good',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  // Extract the base URL and image path
  const urlParts = cloudinaryUrl.split('/upload/');
  if (urlParts.length !== 2) {
    return cloudinaryUrl; // Return original if not a valid Cloudinary URL
  }

  const [baseUrl, imagePath] = urlParts;
  
  // Build transformation string
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  return `${baseUrl}/upload/${transformations.join(',')}/${imagePath}`;
};

/**
 * Creates responsive image URLs for different screen sizes
 */
export const createResponsiveImageUrls = (
  cloudinaryUrl: string,
  breakpoints: ResponsiveBreakpoints = {}
) => {
  const {
    mobile = 480,
    tablet = 768,
    desktop = 1920
  } = breakpoints;

  return {
    mobile: optimizeCloudinaryImage(cloudinaryUrl, { 
      width: mobile, 
      quality: 'auto:good',
      format: 'auto'
    }),
    tablet: optimizeCloudinaryImage(cloudinaryUrl, { 
      width: tablet, 
      quality: 'auto:good',
      format: 'auto'
    }),
    desktop: optimizeCloudinaryImage(cloudinaryUrl, { 
      width: desktop, 
      quality: 'auto:good',
      format: 'auto'
    })
  };
};

/**
 * Preset optimizations for common use cases
 */
export const ImagePresets = {
  // Hero/Background images
  hero: (url: string) => optimizeCloudinaryImage(url, {
    width: 1920,
    height: 1080,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto'
  }),

  // Card/thumbnail images
  thumbnail: (url: string) => optimizeCloudinaryImage(url, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto'
  }),

  // Profile pictures
  avatar: (url: string) => optimizeCloudinaryImage(url, {
    width: 200,
    height: 200,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:good',
    format: 'auto'
  }),

  // Gallery images
  gallery: (url: string) => optimizeCloudinaryImage(url, {
    width: 800,
    height: 600,
    crop: 'fit',
    quality: 'auto:good',
    format: 'auto'
  }),

  // Mobile optimized
  mobile: (url: string) => optimizeCloudinaryImage(url, {
    width: 480,
    quality: 'auto:low',
    format: 'auto'
  })
};

/**
 * Creates a responsive image with srcSet for different screen sizes
 */
export const createResponsiveSrcSet = (
  cloudinaryUrl: string,
  breakpoints: ResponsiveBreakpoints = {}
): string => {
  const urls = createResponsiveImageUrls(cloudinaryUrl, breakpoints);
  
  return [
    `${urls.mobile} 480w`,
    `${urls.tablet} 768w`,
    `${urls.desktop} 1920w`
  ].join(', ');
}; 