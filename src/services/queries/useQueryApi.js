import axios from "axios";
import { SERVER_URL } from "@env";
import { useQuery } from "@tanstack/react-query";

const useQueryApi = (
  queryKey,
  urlWithOutBase,
  userToken,
  customConfig = {},
  enabled = true,
  keepPrevious = false
) => {
  const defaultConfig = {
    method: "get",
    baseURL: SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken ? `Bearer ${userToken}` : "", // Include user token if available
    },
  };

  const config = {
    ...defaultConfig,
    ...customConfig,
  };

  const queryFn = async () => {
    try {
      const response = await axios.request({
        url: urlWithOutBase,
        ...config,
      });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. We are working to fix it";
      throw new Error(message);
    }
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    placeholderData: keepPrevious ? keepPreviousData : null,
    // You can add other React Query options here if needed
  });
};

export default useQueryApi;
