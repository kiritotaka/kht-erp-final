<template>
  <div class="text-lg font-bold">Danh sách tuyển dụng</div>
  <div class="p-3 m-auto rounded-lg mt-3">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(item, index) in listData" :key="index">
        <div
          class="bg-white shadow-sm rounded-lg p-3 hover:shadow-md grid gap-2"
        >
          <div class="font-bold">{{ item.name }}</div>
          <div class="flex justify-between">
            <div class="text-sm">Nội dung chi tiết:</div>
            <div>{{ item.description }}</div>
          </div>
          <div class="flex justify-between">
            <div class="text-sm">Số lượng tuyển dụng:</div>
            <div>{{ item.quantity }}</div>
          </div>
          <div class="flex justify-between">
            <div class="text-sm">Người tạo yêu cầu:</div>
            <div>{{ findUser(item.user_id) }}</div>
          </div>
          <div class="flex justify-between">
            <div class="text-sm">Ngày tạo yêu cầu:</div>
            <div>{{ formatDate(item.created_at, "DD/MM/YYYY") }}</div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="">Trạng thái</div>
            <div
              v-if="item.status === 0"
              class="text-orange-darken-3 font-bold"
            >
              Đang chờ xử lý
              <span
                class="mdi mdi-pencil cursor-pointer"
                v-if="checkPermission()"
                @click="updateData(item)"
              ></span>
            </div>
            <div v-if="item.status === 1" class="text-red-darken-4 font-bold ">
              Yêu cầu bị từ chối
              <span v-if="item.updated_at" class="font-bold"> - {{formatDate(item.updated_at, 'DD/MM/YYYY')}}</span>
            </div>
            <div v-if="item.status === 2" class="text-blue-darken-3 font-bold">
              Đã được phê duyệt
              <span v-if="item.updated_at" class="font-bold"> - {{formatDate(item.updated_at, 'DD/MM/YYYY')}}</span>
            </div>
          </div>
          <div class="flex justify-between text-sm" v-if="item.note">
            <div class="">Nội dung phê duyệt:</div>
            <div>{{ item.note }}</div>
          </div>
        </div>
      </div>
    </div>
    <v-pagination
      class="mt-4"
      v-model="page"
      :length="pageCount"
      :total-visible="5"
      next-icon="mdi:mdi-menu-right"
      prev-icon="mdi:mdi-menu-left"
    ></v-pagination>
    <v-dialog v-model="dialogupdate" max-width="500">
      <v-card>
        <v-card-text>
          <div class="flex justify-between mb-5">
            <div class="font-bold text-xl">Phê duyệt yêu cầu</div>
            <div>
              <span
                class="mdi mdi-close text-xl"
                @click="dialogupdate = false"
              ></span>
            </div>
          </div>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-textarea
              placeholder="Ghi chú chi tiết nội dung Phê duyệt/Từ chối"
              label="Nội dung ghi chú"
              variant="outlined"
              density="comfortable"
              v-model="note"
              :rules="rules"
              auto-grow
            ></v-textarea>
          </v-form>
          <div class="flex justify-end gap-3 mt-3">
            <v-btn
              color="orange-darken-4"
              class="rounded-lg"
              @click="submit(1)"
              size="large"
              >Từ chối yêu cầu</v-btn
            >
            <v-btn
              color="blue-darken-4"
              class="rounded-lg"
              @click="submit(2)"
              size="large"
              >Phê duyệt yêu cầu</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/customerStore";
import moment from "moment";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "RecruitmentListPage",
  data() {
    return {
      listData: [],
      page: 1,
      per_page: 6,
      pageCount: 0,
      dialogupdate: false,
      dataSelected: null,
      valid: false,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      note: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["dataLogin"]),
    ...mapState(useCustomerStore, ["userListData"]),
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchListRecruitment",
      "updateRecruitment",
    ]),
    ...mapActions(useBaseStore, ["snackChange"]),
    fetchData() {
      let params = {
        page: this.page,
        per_page: this.per_page,
      };
      this.fetchListRecruitment("/recruitment_request", params).then((resp) => {
        if (resp) {
          this.listData = resp.items;
          this.pageCount = Math.ceil(resp.itemsTotal / this.per_page);
        }
      });
    },
    formatDate(val, str) {
      return moment(val).format(str);
    },
    checkPermission() {
      let per = ["admin","supervisor", "manager"];
      return per.includes(this.dataLogin?.user?._permission?.permission);
    },
    findUser(val) {
      if (val) {
        let data = this.userListData.find((item) => {
          return item.id === val;
        });
        return data.fullname;
      } else {
        return "";
      }
    },
    updateData(data) {
      this.note = null;
      this.dialogupdate = true;
      this.dataSelected = data;
    },
    async submit(status) {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = { ...this.dataSelected };
        params.status = status;
        params.note = this.note;
        params.updated_at = moment(new Date()).format();
        this.updateRecruitment(
          `/recruitment_request/${this.dataSelected.id}`,
          params
        ).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Cập nhật thông tin thành công",
              color: "blue-darken-4",
            });
            this.dialogupdate = false;
            this.fetchData();
          }
        });
      }
    },
  },
  watch: {
    page(val) {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>