import axios from "axios"
import { SERVER_URL } from "@env"
import { useMutation } from "@tanstack/react-query"

const useApi = (
  urlWithOutBase,
  userToken,
  method = "post",
  customConfig = {}
) => {
  const defaultConfig = {
    method,
    baseURL: SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken ? `Bearer ${userToken}` : "", // Include user token if available
    },
  }

  const config = {
    ...defaultConfig,
    ...customConfig,
  }

  const mutationFn = async (body) => {
    try {
      const response = await axios.request({
        url: urlWithOutBase,
        data: body,
        ...config,
      })
      return response.data
    } catch (error) {
      // Handle network errors, failed requests, etc.

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. We are working to fix it"
      throw new Error(message)
    }
  }

  return useMutation({
    mutationFn,
  })
}

export default useApi

