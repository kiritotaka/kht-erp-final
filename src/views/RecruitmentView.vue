<template>
  <div class="my-3 text-lg font-bold max-w-lg m-auto">Tạo yêu cầu tuyển dụng</div>
  <div class="border p-3 max-w-lg m-auto rounded-lg">
    <v-form v-model="valid" ref="form" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-3">
        <v-text-field
          label="Phòng ban yêu cầu"
          variant="outlined"
          density="comfortable"
          v-model="recruitmentDepartment"
          readonly
        ></v-text-field>
        <v-text-field
          type="number"
          label="Số lượng tuyển dụng"
          variant="outlined"
          density="comfortable"
          v-model="recruitmentQuantity"
          :rules="rules"
        ></v-text-field>
      </div>
      <div class="grid grid-cols-1">
        <v-text-field
          label="Tiêu đề"
          variant="outlined"
          density="comfortable"
          v-model="recruitmentName"
          :rules="rules"
        ></v-text-field>
      </div>
      <div class="grid grid-cols-1">
        <v-textarea
          label="Nội dung chi tiết"
          variant="outlined"
          density="comfortable"
          v-model="recruitmentDescription"
          :rules="rules"
          rows="2"
        >
        </v-textarea>
      </div>
    </v-form>
    <div class="m-auto mt-3">
      <v-btn
        variant="flat"
        color="blue-darken-3"
        @click="submit"
        class="w-full"
      >
        Xác nhận
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../stores/customerStore";
import { useBaseStore } from "../stores/baseStore";
import moment from 'moment'
export default {
  name: "RecruitmentPage",
  data() {
    return {
      valid: false,
      recruitmentDepartment: null,
      recruitmentQuantity: 1,
      recruitmentName: null,
      recruitmentDescription: null,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
    };
  },
  computed: {
    ...mapState(useBaseStore, ["dataLogin"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["postRecruitmentAction"]),
    ...mapActions(useBaseStore, ["snackChange"]),
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          description: this.recruitmentDescription,
          name: this.recruitmentName,
          quantity: this.recruitmentQuantity,
          status: 0,
          user_id: this.dataLogin.user.id,
          department_id: this.dataLogin.user._department.id,
          request_date: moment(new Date()).format(),
        };
        this.postRecruitmentAction('/recruitment_request', params).then(resp => {
          if(resp){
            this.snackChange({
              status: true,
              message: "Tạo yêu cầu tuyển dụng thành công",
              color: "blue-darken-4",
            });
          }
        })
      }
    },
  },
  created() {
    this.recruitmentDepartment = this.dataLogin.user?._department?.name;
  },
};
</script>

<style>
</style>