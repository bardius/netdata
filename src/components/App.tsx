import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppBar, Box, CircularProgress, Container, Toolbar, Typography } from '@material-ui/core';
import { CoinsProvider } from '../contexts/coins/CoinsProvider';
import { Coins } from '../pages/Coins';

const CoinDetailsPage = lazy(() => import(/* webpackChunkName: "CoinDetailsPage" */ '../pages/CoinDetails'));

function App() {
  return (
    <Box data-testid={'app'}>
      <CoinsProvider>
        <Container maxWidth='md'>
          <AppBar position='static' color={'secondary'}>
            <Toolbar variant='dense'>
              <Typography variant='h5' component={'h1'}>
                Netdata Test
              </Typography>
            </Toolbar>
          </AppBar>

          <Suspense
            fallback={
              <Box py={'100px'} width={'100%'}>
                <CircularProgress />
              </Box>
            }>
            <Routes>
              <Route index element={<Coins />} />
              <Route path='coin/:coinMarketId/details' element={<CoinDetailsPage />} />
            </Routes>
          </Suspense>
        </Container>
      </CoinsProvider>
    </Box>
  );
}

export default App;
