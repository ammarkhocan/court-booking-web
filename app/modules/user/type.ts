export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterResponse = User;

export type LoginResponse = string;

export type MeResponse = User;
