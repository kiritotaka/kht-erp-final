<template>
  <div class="text-lg font-bold max-w-lg m-auto">Thêm nhân viên thử việc</div>
  <div class="border rounded-lg max-w-lg m-auto mt-3 p-3">
    <v-form v-model="valid" ref="form" @submit.prevent="submit">
      <div class="grid grid-cols-1 gap-3">
        <v-text-field
          label="Họ và tên"
          variant="outlined"
          density="comfortable"
          v-model="fullname"
          :rules="rules"
        ></v-text-field>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <v-text-field
          label="Số điện thoại"
          variant="outlined"
          density="comfortable"
          v-model="phone_number"
          :rules="rules"
        ></v-text-field>
        <v-date-input
          prepend-icon=""
          label="Ngày nhận việc"
          variant="outlined"
          v-model="startDate"
          class="p-date hideDate"
          :cancel-text="'Đóng'"
          :hide-actions="true"
          placeholder="dd/mm/yyyy"
          :format="'dd/mm/yyyy'"
          :rules="rules"
          :min="todayDate"
          density="comfortable"
        >
          <template v-slot:default>
            {{ fromDateFormated }}
          </template>
        </v-date-input>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <v-select
          label="Phòng ban"
          v-model="department"
          :items="departmentList"
          variant="outlined"
          density="comfortable"
          :rules="rules"
          item-title="name"
          item-value="id"
        ></v-select>
        <v-autocomplete
          label="Mã yêu cầu"
          v-model="recruitmentSelected"
          :items="listRecruitment"
          item-title="name"
          item-value="id"
          :rules="rules"
          variant="outlined"
          density="comfortable"
        ></v-autocomplete>
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
import moment from "moment";
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/customerStore";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "AddProbationPage",
  data() {
    return {
      fullname: null,
      startDate: null,
      department: null,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      fromDateFormated: null,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      departmentList: [],
      valid: false,
      listRecruitment: [],
      recruitmentSelected: null,
      phone_number: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["departmentListData", "dataLogin"]),
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchListRecruitment",
      "addNewProbation",
    ]),
    ...mapActions(useBaseStore, ["snackChange"]),
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          fullname: this.fullname,
          startDate: moment(this.startDate).format(),
          department_id: this.department,
          recruitment_request_id: this.recruitmentSelected,
          user_id: this.dataLogin.user.id,
          phone_number: this.phone_number,
        };
        this.addNewProbation("/probation",params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Thêm nhân sự thành công",
              color: "blue-darken-4",
            });
          }
        });
      }
    },
    fetchRecruitment() {
      this.fetchListRecruitment("/recruitment_request").then((resp) => {
        if (resp) {
          this.listRecruitment = resp.items;
        }
      });
    },
  },
  watch: {
    startDate(val) {
      if (val) this.fromDateFormated = moment(val).format("DD/MM/YYYY");
    },
    recruitmentSelected(val) {
      console.log(val);
    },
  },
  created() {
    this.departmentList = this.departmentListData;
    this.fetchRecruitment();
  },
};
</script>

<style>
</style>