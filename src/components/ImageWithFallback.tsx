import React, { useState } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CloudinaryImage from './CloudinaryImage';

interface ImageWithFallbackProps extends Omit<BoxProps, 'component'> {
  src: string | undefined;
  alt: string;
  fallbackIcon?: React.ReactNode;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackIcon,
  sx,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  
  // Debug: Log image loading attempts
  React.useEffect(() => {
    if (src) {
      console.log('ImageWithFallback: Attempting to load image:', src);
      setError(false);
      setLoading(true);
    }
  }, [src]);
  
  // Use default fallback icon with theme-aware color
  const defaultFallbackIcon = <ImageIcon sx={{ fontSize: 48, color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }} />;
  
  if (!src || error) {
    if (error) {
      console.log('ImageWithFallback: Image failed to load:', src);
    }
    if (!src) {
      console.log('ImageWithFallback: No image source provided');
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

  // Check if it's a Cloudinary URL and use CloudinaryImage for better optimization
  const isCloudinaryUrl = src && (src.includes('cloudinary.com') || src.includes('res.cloudinary.com'));
  
  if (isCloudinaryUrl) {
    return (
      <CloudinaryImage
        src={src}
        alt={alt}
        fallbackIcon={fallbackIcon}
        sx={sx}
        {...props}
      />
    );
  }

  // Fall back to regular img for non-Cloudinary URLs
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={(e) => {
        console.log('ImageWithFallback: Image load error for:', src, e);
        console.log('ImageWithFallback: Error details:', {
          src,
          alt,
          currentSrc: (e.target as HTMLImageElement).currentSrc,
          naturalWidth: (e.target as HTMLImageElement).naturalWidth,
          naturalHeight: (e.target as HTMLImageElement).naturalHeight,
        });
        setError(true);
        setLoading(false);
      }}
      onLoad={() => {
        console.log('ImageWithFallback: Image loaded successfully:', src);
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

export default ImageWithFallback; 