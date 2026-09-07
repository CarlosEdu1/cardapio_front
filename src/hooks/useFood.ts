import axios, { type AxiosPromise } from "axios"
import type { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = axios.get(API_URL + '/food');
    return response;
};

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}
async function deleteFood(id:number) {
    return axios.delete(`${API_URL}/food/${id}`)
}

export function useFoodDataDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFood,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["food-data"],
            });
        },
    });
   }
