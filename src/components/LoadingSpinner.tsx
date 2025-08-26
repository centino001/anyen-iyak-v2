import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 60 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        py: 4,
        minHeight: '200px'
      }}
    >
      {/* Animated Circular Progress */}
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          size={size}
          thickness={4}
          sx={{
            color: 'var(--primary-color)',
            animation: 'rotate 2s linear infinite',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
              strokeDasharray: '80, 200',
              strokeDashoffset: 0,
              animation: 'dash 1.5s ease-in-out infinite',
            },
            '@keyframes rotate': {
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
            '@keyframes dash': {
              '0%': {
                strokeDasharray: '1, 200',
                strokeDashoffset: 0,
              },
              '50%': {
                strokeDasharray: '89, 200',
                strokeDashoffset: -35,
              },
              '100%': {
                strokeDasharray: '89, 200',
                strokeDashoffset: -124,
              },
            },
          }}
        />
        
        {/* Inner rotating dot */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
              },
              '50%': {
                opacity: 0.7,
                transform: 'translate(-50%, -50%) scale(1.2)',
              },
            },
          }}
        />
      </Box>

      {/* Loading Message */}
      <Typography
        variant="body1"
        sx={{
          color: 'var(--text-color)',
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          textAlign: 'center',
          animation: 'fadeInOut 2s ease-in-out infinite',
          '@keyframes fadeInOut': {
            '0%, 100%': {
              opacity: 0.6,
            },
            '50%': {
              opacity: 1,
            },
          },
        }}
      >
        {message}
      </Typography>

      {/* Decorative elements */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          opacity: 0.6,
        }}
      >
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--primary-color)',
              animation: `bounce 1.4s ease-in-out infinite both`,
              animationDelay: `${index * 0.16}s`,
              '@keyframes bounce': {
                '0%, 80%, 100%': {
                  transform: 'scale(0)',
                },
                '40%': {
                  transform: 'scale(1)',
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LoadingSpinner; 