export interface User {
  slug: string;
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}

export interface AuthUserDto {
  accessToken: string;
  refreshToken: string;
  data: User;
}
