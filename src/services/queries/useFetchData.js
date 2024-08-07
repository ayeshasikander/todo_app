import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
    const { data } = await axios.get('https://api.alquran.cloud/v1/surah');
    return data.data;
}

const useFetchData = () => {
    return useQuery(['data'], fetchData ,{
        staleTime: 1000 * 60 * 60, // 1 hour
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    })

}

export default useFetchData