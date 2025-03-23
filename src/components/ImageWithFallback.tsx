import React, { useState } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

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
  const theme = useTheme();
  
  // Use default fallback icon with theme-aware color
  const defaultFallbackIcon = <ImageIcon sx={{ fontSize: 48, color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }} />;
  
  if (!src || error) {
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

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={() => setError(true)}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        ...sx
      }}
      {...props}
    />
  );
};

export default ImageWithFallback; 