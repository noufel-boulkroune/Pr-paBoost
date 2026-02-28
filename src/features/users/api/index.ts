import { api } from "@/services/axios";
import {
  UserProfile,
  StudentStats,
  InstructorStats,
  Enrollment,
  Certificate,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../types";
import { Course } from "@/features/courses/types";

const USERS_BASE = "/users";

export const usersApi = {
  // Profile
  getProfile: (): Promise<UserProfile> =>
    api.get(`${USERS_BASE}/me`),

  updateProfile: (data: UpdateProfileInput): Promise<UserProfile> =>
    api.put(`${USERS_BASE}/me`, data),

  uploadAvatar: (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post(`${USERS_BASE}/me/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  changePassword: (data: ChangePasswordInput): Promise<void> =>
    api.post(`${USERS_BASE}/me/password`, data),

  // Student endpoints
  getStudentStats: (): Promise<StudentStats> =>
    api.get(`${USERS_BASE}/me/stats`),

  getEnrollments: (): Promise<Enrollment[]> =>
    api.get(`${USERS_BASE}/me/enrollments`),

  getWishlist: (): Promise<Course[]> =>
    api.get(`${USERS_BASE}/me/wishlist`),

  addToWishlist: (courseId: string): Promise<void> =>
    api.post(`${USERS_BASE}/me/wishlist`, { courseId }),

  removeFromWishlist: (courseId: string): Promise<void> =>
    api.delete(`${USERS_BASE}/me/wishlist/${courseId}`),

  getCertificates: (): Promise<Certificate[]> =>
    api.get(`${USERS_BASE}/me/certificates`),

  // Instructor endpoints
  getInstructorStats: (): Promise<InstructorStats> =>
    api.get(`${USERS_BASE}/me/instructor-stats`),

  getInstructorCourses: (): Promise<Course[]> =>
    api.get(`${USERS_BASE}/me/courses`),

  // Admin endpoints
  getAllUsers: (params?: { page?: number; limit?: number; role?: string; search?: string }) =>
    api.get(USERS_BASE, { params }),

  getUserById: (id: string): Promise<UserProfile> =>
    api.get(`${USERS_BASE}/${id}`),

  updateUser: (id: string, data: Partial<UserProfile>): Promise<UserProfile> =>
    api.put(`${USERS_BASE}/${id}`, data),

  deleteUser: (id: string): Promise<void> =>
    api.delete(`${USERS_BASE}/${id}`),

  updateUserRole: (id: string, role: string): Promise<UserProfile> =>
    api.patch(`${USERS_BASE}/${id}/role`, { role }),
};
