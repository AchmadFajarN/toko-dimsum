import { useAuthContext } from "../context/authContext";

export const useAuth = () => {
  const context = useAuthContext();

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
};
