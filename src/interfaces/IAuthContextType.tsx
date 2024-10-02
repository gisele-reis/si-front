export default interface IAuthContextType {
  isAuthenticated: boolean;
  login: ({ token, username }: { token: string; username: string }) => void;
  logout: () => void;
}
