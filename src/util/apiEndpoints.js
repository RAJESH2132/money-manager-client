import config from "./config";

export const BASE_URL = config.baseUrl;
const CLOUDINARY_CLOUD_NAME = config.cloudName;

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
