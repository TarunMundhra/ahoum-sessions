import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { axiosInstance } from "../api/axios";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [googleAuthError, setGoogleAuthError] = useState(null);

  // Fetch user profile (restoration)
  const {
    data: user,
    isLoading: loadingAuth,
    error: profileError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("auth/user/");
        return res.data;
      } catch (err) {
        // Missing/expired auth cookies are expected for signed-out users.
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          return null;
        }
        throw err;
      }
    },
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (tokenResponse) => {
      const res = await axiosInstance.post("auth/google/", {
        access_token: tokenResponse.access_token,
      });
      return res.data.user;
    },
    onSuccess: (userData) => {
      setGoogleAuthError(null);
      queryClient.setQueryData(["user"], userData);
    },
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleAuthError(null);
      loginMutation.mutate(tokenResponse);
    },
    onError: () => setGoogleAuthError("Google Login was closed or failed."),
  });

  const authError =
    googleAuthError ||
    loginMutation.error?.response?.data?.detail ||
    loginMutation.error?.message ||
    profileError?.message ||
    null;

  return {
    user,
    login,
    loadingAuth,
    authError,
  };
};
