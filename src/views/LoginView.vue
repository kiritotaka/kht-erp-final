<template>
  <div class="mx-4">
    <div
      class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm max-w-md m-auto"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800">Đăng nhập</h1>
          <p class="mt-2 text-sm text-gray-600">
            Chưa có tài khoản?
            <router-link
              class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
              :to="'/register'"
            >Đăng ký</router-link>
          </p>
        </div>

        <div class="mt-5">
          <!-- Form -->
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Tên đăng nhập"
                  variant="outlined"
                  density="comfortable"
                  v-model="useName"
                  :rules="rulesUserName"
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                <v-text-field
                  label="Mật khẩu"
                  variant="outlined"
                  density="comfortable"
                  v-model="passWord"
                  :rules="rulesPassWord"
                  :type="visible ? 'text' : 'password'"
                  ><template v-slot:append-inner>
                    <button type="button" @click="visible = !visible">
                      <i
                        v-if="visible"
                        class="far fa-eye eyes-button-custom"
                      ></i>
                      <i
                        v-if="!visible"
                        class="far fa-eye-slash eyes-button-custom"
                      ></i>
                    </button> </template></v-text-field
              ></v-col>
            </v-row>
          </v-form>
          <div class="text-center normal-case">
            <v-btn
              
              color="blue-darken-4"
              class="mt-3 w-3/5 m-auto rounded-lg"
              @click="submit"
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