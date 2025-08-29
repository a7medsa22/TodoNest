export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

export const UserRole = {
  USER: 'USER' as const,
  ADMIN: 'ADMIN' as const,
  MODERATOR: 'MODERATOR' as const,
} as const;


