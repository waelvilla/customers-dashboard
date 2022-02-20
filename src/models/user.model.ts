export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  lastLogin: Date;
  token: string;
  role: 'admin' | 'viewer';
}

export interface UserFromApi {
  user_id: string;
  user_name: string;
  user_email: string;
  created_at: string;
  last_login: string;
  token: string;
  role: 'admin' | 'viewer';
}
export function transformApiUser(apiUser: UserFromApi): User {
  const { user_id, user_name, user_email, created_at, last_login, token, role } = apiUser;
  return {
    id: user_id,
    name: user_name,
    email: user_email,
    createdAt: new Date(created_at),
    lastLogin: new Date(last_login),
    token,
    role
  };
}
