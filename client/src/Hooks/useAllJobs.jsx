
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAllJobs = () => {
    const axiosPublic = useAxiosPublic()

    const {data:jobs, isLoading} = useQuery({
        queryKey: ["allJobs"],
        queryFn: async()=>{
            const { data } = await axiosPublic.get("/allJobs");
            return data
        }
    })
    return [jobs, isLoading]
};

export default useAllJobs;