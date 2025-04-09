// Define the shape of credentials
export interface Credentials {
  email: string;
  password: string;
}

export type useAuthT = {
  isAuthenticated: boolean;

  token: string | undefined;

  // Credentials (be careful not to expose password)
  username: string | undefined;

  // Authentication methods
  login: (Credentials) => Promise<boolean>;
  logout: () => void;

  // Error state
  error: string;
};
