import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from "@tanstack/react-query";
const useUserRole = () => {
    const axiosPublic = useAxiosPublic()
    const {user,loading} = useAuth()

    const { data: role = "", isLoading } = useQuery({
      queryKey: ["UserRole", user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
        const { data } = await axiosPublic.get(`/user-role/${user?.email}`, {withCredentials:true});
        return data.role;
      },
    });
    return [role,isLoading]
};

export default useUserRole;