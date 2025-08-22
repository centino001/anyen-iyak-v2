import React, { useState } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import { ImagePresets } from '../utils/cloudinaryOptimizer';

interface CloudinaryImageProps extends Omit<BoxProps, 'component' | 'width' | 'height'> {
  src: string;
  alt: string;
  transformWidth?: number;
  transformHeight?: number;
  crop?: 'fit' | 'fill' | 'scale' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  fallbackIcon?: React.ReactNode;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  transformWidth = 800,
  transformHeight = 600,
  crop = 'fit',
  quality = 'auto',
  format = 'auto',
  fallbackIcon,
  sx,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Default fallback icon with theme-aware color
  const defaultFallbackIcon = <ImageIcon sx={{ fontSize: 48, color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }} />;

  // Check if the src is a Cloudinary URL
  const isCloudinaryUrl = src && (src.includes('cloudinary.com') || src.includes('res.cloudinary.com'));
  


  if (!src || error) {
    if (error) {
      console.log('CloudinaryImage: Image failed to load:', src);
    }
    if (!src) {
      console.log('CloudinaryImage: No image source provided');
    }
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          ...sx
        }}
        {...props}
      >
        {fallbackIcon || defaultFallbackIcon}
      </Box>
    );
  }

  // If it's not a Cloudinary URL, fall back to regular img
  if (!isCloudinaryUrl) {
    return (
      <Box
        component="img"
        src={src}
        alt={alt}
        onError={() => {
          console.log('CloudinaryImage: Regular image load error for:', src);
          setError(true);
          setLoading(false);
        }}
        onLoad={() => {
          console.log('CloudinaryImage: Regular image loaded successfully:', src);
          setLoading(false);
        }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: loading ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          ...sx
        }}
        {...props}
      />
    );
  }

  // For Cloudinary URLs, use our optimizer for better performance
  const optimizedUrl = ImagePresets.gallery(src);

  return (
    <Box
      component="img"
      src={optimizedUrl}
      alt={alt}
      onError={() => {
        console.log('CloudinaryImage: Optimized image load error for:', src);
        setError(true);
        setLoading(false);
      }}
      onLoad={() => {
        console.log('CloudinaryImage: Optimized image loaded successfully:', src);
        setLoading(false);
      }}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        opacity: loading ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
        ...sx
      }}
      {...props}
    />
  );


};

export default CloudinaryImage; 