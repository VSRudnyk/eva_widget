import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Components/Layout';
// import { PrivateRoute } from './Components/PrivateRoute';
// import { PublicRoute } from './Components/PublicRoute';
import { Auth } from './Components/Auth/Auth';
import { Widget } from './Components/Widget/Widget';
import { useSelector } from 'react-redux';
import authSelectors from '../src/redux/authSelectors';
import { useFetchCurrentBotQuery } from './redux/authAPI';
import './index.css';

function App() {
  const token = useSelector(authSelectors.getToken);
  useFetchCurrentBotQuery(null, { skip: !token });
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          path='auth'
          element={
            // <PublicRoute restricted>
            <Auth />
            // </PublicRoute>
          }
        />
        <Route
          path='widget'
          element={
            // <PrivateRoute>
            <Widget />
            // </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='auth' />} />
      </Route>
    </Routes>
  );
}

export default App;
