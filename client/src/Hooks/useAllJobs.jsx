
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAllJobs = () => {
    const axiosPublic = useAxiosPublic()

    const {data:jobs, isLoading,refetch} = useQuery({
        queryKey: ["allJobs"],
        queryFn: async()=>{
            const { data } = await axiosPublic.get("/allJobs");
            return data
        }
    })
    return [jobs, isLoading,refetch]
};

export default useAllJobs;