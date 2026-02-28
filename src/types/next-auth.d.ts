import { UserRole } from "@/features/auth/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
      avatar?: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    accessToken: string;
  }
}
