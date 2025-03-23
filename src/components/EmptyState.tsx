import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  icon = <InboxIcon sx={{ fontSize: 64 }} />
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
        borderRadius: 2,
        minHeight: 200
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState; 