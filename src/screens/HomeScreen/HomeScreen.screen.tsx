import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';

const HomeScreen: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(token);
  useEffect(() => {
    if (token) {
      navigate('/customers');
    } else {
      navigate('/login');
    }
  }, []);
  return null;
};

export default HomeScreen;
