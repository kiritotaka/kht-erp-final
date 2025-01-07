import axios from "axios";
import router from "../router";
import { useBaseStore } from "../stores/baseStore";
const addTokenHeader = () => {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Secret-Key": "okyo-secret-key",
  };
};
const getHeader = () => {
  const baseStore = useBaseStore();
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Secret-Key": "okyo-secret-key",
    Authorization: baseStore.$state.authToken ? baseStore.$state.authToken : "",
  };
};
async function fetch(url: string) {
  const header = getHeader();
  const baseStore = useBaseStore();
  baseStore.overlayChange(true);
  try {
    const response = await axios.get(url, { headers: header });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}
async function add(url: string, params: any) {
  const header = getHeader();
  const baseStore = useBaseStore();
  baseStore.overlayChange(true);
  try {
    const response = await axios.post(url, params, { headers: header });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}
async function update(url: string, params: any) {
  const header = getHeader();
  const baseStore = useBaseStore();
  baseStore.overlayChange(true);
  try {
    const response = await axios.put(url, params, { headers: header });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}
async function change(url: string, params: any) {
    const header = getHeader();
    const baseStore = useBaseStore();
    baseStore.overlayChange(true);
    try {
      const response = await axios.patch(url, params, { headers: header });
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }
async function remove(url: string) {
  const header = getHeader();
  const baseStore = useBaseStore();
  baseStore.overlayChange(true);
  try {
    const response = await axios.delete(url, {
      headers: header,
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}
const handleSuccess = (data: any) => {
  const baseStore = useBaseStore();
  baseStore.overlayChange(false);
  return data;
};
const handleError = (data: any) => {
  const baseStore = useBaseStore();
  baseStore.overlayChange(false);
  if (data?.status === 403 || data?.status === 401) {
    baseStore.$state.dataLogin = null;
    router.push({ path: "/login" });
  }
  baseStore.snackChange({
    status: true,
    message: data.message,
    color: "red",
  });
  return data;
};
export const baseService = {
  fetch,
  add,
  update,
  change,
  remove,
};
