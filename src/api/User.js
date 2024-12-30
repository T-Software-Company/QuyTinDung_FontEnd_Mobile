import axiosInstance from "./axiosInstance";


export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
// Hàm gọi API lấy thông tin người dùng
export const getUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

