<template>
  <div class="mx-4">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
    </div>
    <div
      class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm max-w-md m-auto"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <img src="@/assets/images/logo.png" class="h-full m-auto w-1/2" />
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Đăng nhập</h1>
          <!-- <p class="mt-2 text-sm text-gray-600">
            Chưa có tài khoản?
            <router-link
              class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
              :to="'/register'"
              >Đăng ký</router-link
            >
          </p> -->
        </div>

        <div class="mt-5">
          <!-- Form -->
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <div class="grid gap-3">
              <v-text-field
                label="Tên đăng nhập"
                variant="outlined"
                density="comfortable"
                v-model="useName"
                :rules="rulesUserName"
              ></v-text-field>
              <v-text-field
                label="Mật khẩu"
                variant="outlined"
                density="comfortable"
                v-model="passWord"
                :rules="rulesPassWord"
                :type="visible ? 'text' : 'password'"
                ><template v-slot:append-inner>
                  <button type="button" @click="visible = !visible">
                    <i v-if="visible" class="far fa-eye eyes-button-custom"></i>
                    <i
                      v-if="!visible"
                      class="far fa-eye-slash eyes-button-custom"
                    ></i>
                  </button> </template
              ></v-text-field>
            </div>
          </v-form>
          <div class="text-center normal-case">
            <v-btn
              color="blue-darken-4"
              class="mt-3 w-3/5 m-auto rounded-lg"
              @click="submit"
              size="large"
              ><span class="text-md normal-case">Đăng nhập</span></v-btn
            >
          </div>
          <!-- End Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "LoginPage",
  data() {
    return {
      visible: false,
      valid: false,
      useName: null,
      rulesUserName: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập tên đăng nhập";
        },
      ],
      passWord: null,
      rulesPassWord: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập mật khẩu";
        },
      ],
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["loginAction"]),
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          username: this.useName,
          password: this.passWord,
        };
        this.loginAction("/auth/login", params).then((resp) => {
          if (resp) {
            this.$router.push({ path: "/assign" });
          }
        });
      }
    },
  },
};
</script>

<style>
</style>