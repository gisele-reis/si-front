export default interface IAuthContextType {
    isAuthenticated: boolean;
    login: ({ token, email }: { token: string, email: string }) => void;
    logout: () => void;
}