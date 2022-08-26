export interface UserLocalStorage  {
    idUsuario:string,
    idAccount: string,
    tokenAut: string;
    prefijo: string;
    idUsuarioConPrefijo: string;
}

export const getUserLocalStorage = () => {
  const userStorage = localStorage.getItem("inoty-user");
  if (!userStorage) return null;
  const data = JSON.parse(userStorage);
  return data as UserLocalStorage;
};
