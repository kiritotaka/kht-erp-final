<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div class="border p-3 rounded-lg">
      <div class="text-lg font-bold">Thêm mới user</div>
      <div class="mt-4">
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <div class="grid grid-cols-2 gap-3">
            <v-text-field
              label="Họ và tên"
              variant="outlined"
              density="comfortable"
              v-model="fullname"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Số điện thoại"
              variant="outlined"
              density="comfortable"
              v-model="phone_number"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Email"
              variant="outlined"
              density="comfortable"
              v-model="email"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Tên đăng nhập"
              variant="outlined"
              density="comfortable"
              v-model="name"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Mật khẩu"
              variant="outlined"
              density="comfortable"
              v-model="password"
              :rules="rules"
            ></v-text-field>
            <v-select
              label="Phòng ban"
              v-model="department_id"
              :items="departmentListData"
              variant="outlined"
              density="comfortable"
              :rules="rules"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Phân quyền"
              v-model="permission_id"
              :items="permissionListData"
              variant="outlined"
              density="comfortable"
              :rules="rules"
              item-title="permission"
              item-value="id"
            ></v-select>
          </div>
        </v-form>
        <div class="flex mt-3">
          <v-btn
            variant="flat"
            color="blue-darken-3"
            @click="submit"
            class="w-3/5 m-auto"
          >
            Xác nhận
          </v-btn>
        </div>
      </div>
    </div>
    <div class="border p-3 rounded-lg">
      <div class="text-lg font-bold">Cập nhật thông tin User</div>
      <div class="mt-4">
        <v-form ref="form1" v-model="valid1" @submit.prevent="submit1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <v-autocomplete
              label="Nhân viên"
              v-model="userSelected"
              :items="userListData"
              variant="outlined"
              density="comfortable"
              :rules="rules"
              item-title="fullname"
              item-value="id"
            ></v-autocomplete>
            <v-text-field
              label="Số điện thoại"
              variant="outlined"
              density="comfortable"
              v-model="phone_number"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Email"
              variant="outlined"
              density="comfortable"
              v-model="email"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Tên đăng nhập"
              variant="outlined"
              density="comfortable"
              v-model="name"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Mật khẩu"
              variant="outlined"
              density="comfortable"
              v-model="password"
              :rules="rules"
            ></v-text-field>
            <v-select
              label="Phòng ban"
              v-model="department_id"
              :items="departmentListData"
              variant="outlined"
              density="comfortable"
              :rules="rules"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Phân quyền"
              v-model="permission_id"
              :items="permissionListData"
              variant="outlined"
              density="comfortable"
              :rules="rules"
              item-title="permission"
              item-value="id"
            ></v-select>
          </div>
        </v-form>
        <div class="flex mt-3">
          <v-btn
            variant="flat"
            color="blue-darken-3"
            @click="submit1"
            class="w-3/5 m-auto"
          >
            Xác nhận
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import { useCustomerStore } from "../../stores/customerStore";
export default {
  name: "UserSettingPage",
  data() {
    return {
      valid: false,
      valid1: false,
      fullname: null,
      phone_number: null,
      email: null,
      name: null,
      password: null,
      department_id: null,
      permission_id: null,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      userSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["departmentListData", "permissionListData"]),
    ...mapState(useCustomerStore, ["userListData"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["registerAction", "snackChange"]),
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          fullname: this.fullname,
          name: this.name,
          email: this.email,
          password: this.password,
          fullname: this.fullname,
          phone_number: this.phone_number,
          permission_id: this.permission_id,
          department_id: this.department_id,
        };
        this.registerAction("/auth/signup", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Tạo user thành công",
              color: "blue",
            });
            location.reload();
          }
        });
      }
    },
    async submit1() {
      const { valid } = await this.$refs.form1.validate();
      if (valid) {
      }
    },
  },
  created() {},
};
</script>

<style>
</style>