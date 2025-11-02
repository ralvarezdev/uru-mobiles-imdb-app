
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'critic';
  stats: UserStats;
  createdAt: string;
}

export interface UserStats {
  moviesRated: number;
  comments: number;
  averageRating: number;
}

export interface UpdateUserProfileData {
  name: string;
  email: string;
  username: string;
  password?: string;
}

export interface DeleteAccountData {
  password: string;
}