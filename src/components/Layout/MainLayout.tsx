import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: '1.5rem',
  color: '#fff',
  fontWeight: 500,
}));

const MainContent = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  background: theme.palette.background.default,
}));

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <StyledAppBar position="fixed">
        <Toolbar>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LogoText variant="h1">
              Task Manager
            </LogoText>
          </motion.div>
        </Toolbar>
      </StyledAppBar>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <MainContent>
          {children}
        </MainContent>
      </Container>
    </Box>
  );
};

export default MainLayout; 