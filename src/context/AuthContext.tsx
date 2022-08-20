import React, {useRef, useState} from 'react';



const useAuthContextValue = () => {
  const [idProfesor, setIdProfesor] = useState<string>('')

  const value = {
    idProfesor,
    setIdProfesor
  };

  return {value};
};

export const AuthContext = React.createContext({});

export const AuthProvider: React.FC = ({children}: any) => {
  const {value} = useAuthContextValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const {value} = useAuthContextValue();
  const context = React.useContext(AuthContext) as typeof value;

  return context;
};
