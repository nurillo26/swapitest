interface UserData {
  userName: string;
  password: string;
}

export const getUserFromLC = () => {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as UserData) : null;
};
