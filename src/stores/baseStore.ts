import { defineStore } from "pinia";
import { baseService } from "../services/base-service";
const API_URL_AUTHEN = import.meta.env.VITE_API_URL_AUTHEN;

export const useBaseStore = defineStore({
  id: "base",
  state: () => ({
    snack: {
      status: false,
      message: "sdd",
      color: "",
    },
    overlay: false,
    windowReSize: null,
    dataLogin: null,
    authToken: null,
    registerData: null,
  }),
  actions: {
    overlayChange(status: boolean) {
      this.overlay = status;
    },
    snackChange(data: any) {
      this.snack = data;
    },
    async loginAction(url: string, params: any) {
      await baseService.add(API_URL_AUTHEN + url, params).then((resp) => {
        this.dataLogin = resp.data;
        if (resp.data) this.authToken = resp.data.authToken;
      });
      return this.dataLogin;
    },
    async registerAction(url: string, params: any) {
      await baseService.add(API_URL_AUTHEN + url, params).then((resp) => {
        this.registerData = resp.data;
      });
      return this.registerData;
    },
  },
  persist: true,
});
