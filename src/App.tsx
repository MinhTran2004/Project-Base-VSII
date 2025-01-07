import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import { AppProvider, useCurrentApp } from './components/context/app.context';
import FindOrderById from './pages/FindOrderById'
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import PrivateRoute from './components/auth';
import ErrorBoundary from './pages/ErrorBoundary';

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/search-order"
            element={
              <PrivateRoute>
                <FindOrderById />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<ErrorBoundary />}></Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App


