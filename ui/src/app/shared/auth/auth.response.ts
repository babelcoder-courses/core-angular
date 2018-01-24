import { User } from '../../users/shared/user';

export interface AuthResponse {
  user: User | { errors: string[] };
}
