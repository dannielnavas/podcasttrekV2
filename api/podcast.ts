import { IResponse } from "@/models/response.interface";

export const getList = async (): Promise<IResponse | undefined> => {
  try {
    const response = await fetch("http://192.168.10.41:3000/audio/podcast-list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data", error);
    return undefined;
  }
};
