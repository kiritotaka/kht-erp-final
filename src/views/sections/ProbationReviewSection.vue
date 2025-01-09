<template>
  <div class="text-lg font-bold">Danh sách nhân sự thử việc</div>
  <div class="border p-3 rounded-lg mt-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="(item, index) in items" :key="index">
        <div class="bg-white shadow-sm p-3 rounded-lg grid gap-3">
          <div class="flex justify-between text-xs">
            <div>Ngày tạo</div>
            <div class="font-semibold text-blue-darken-4">
              {{ formatDate(item.created_at, "DD/MM/YYYY") }}
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Họ và tên</div>
            <div class="font-semibold">{{ item.fullname }}</div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Số điện thoại</div>
            <div class="font-semibold">{{ item.phone_number }}</div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Ngày nhận việc</div>
            <div class="font-semibold text-blue-darken-4">
              {{ formatDate(item.startDate, "DD/MM/YYYY") }}
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Phòng ban</div>
            <div class="font-semibold">
              {{ item._department.name }}
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Mã yêu cầu</div>
            <div class="font-semibold text-right">
              {{ item._probation_recruitment_request_of_user.name }}
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div>Người gửi yêu cầu</div>
            <div class="font-semibold text-right">
              {{
                findUser(item._probation_recruitment_request_of_user.user_id)
              }}
            </div>
          </div>
          <div v-if="checkPermission(['admin','manager','leader','supervisor'])" class="flex justify-between text-sm">
            <div>Thêm đánh giá</div>
            <span
              class="mdi mdi-comment-outline cursor-pointer text-red-darken-4 text-lg"
              @click="addComment(item)"
            ></span>
          </div>
          <div
            v-if="item.probation_comment_id"
            class="grid gap-3 h-[150px] overflow-auto"
          >
            <div
              v-for="(comment, index) in item.probation_comment_id"
              :key="index"
            >
              <div class="p-2 bg-gray-200 rounded-lg text-xs">
                <div class="flex justify-between">
                  <span class="mdi mdi-account">{{
                    findUser(comment.user_id)
                  }}</span>
                  <div class="font-bold">
                    {{ formatDate(comment.created_at, "DD/MM/YYYY") }}
                  </div>
                </div>
                <div class="flex">
                  {{ comment.comment }}
                </div>
              </div>
            </div>
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
    <v-dialog v-model="dialogComment" max-width="500">
      <v-card>
        <v-card-text>
          <div class="flex justify-between mb-5">
            <div class="font-bold text-xl">Thêm đánh giá</div>
            <div>
              <span
                class="mdi mdi-close text-xl"
                @click="dialogComment = false"
              ></span>
            </div>
          </div>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-textarea
              placeholder="Thêm đánh giá nhân sự"
              label="Nội dung"
              variant="outlined"
              density="comfortable"
              v-model="note"
              :rules="rules"
              auto-grow
            ></v-textarea>
          </v-form>
          <div class="flex justify-center gap-3 mt-3">
            <v-btn
              color="blue-darken-4"
              class="rounded-lg"
              @click="submit"
              size="large"
              >Xác nhận</v-btn
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
import baseModel from '../../services/base-model';
export default {
  name: "ReviewProbationPage",
  data() {
    return {
      items: [],
      dialogComment: false,
      valid: false,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      note: null,
      itemSelected: null,
      page: 1,
      per_page: 3,
      pageCount: 0,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["dataLogin"]),
    ...mapState(useCustomerStore, ["userListData"]),
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchListProbation",
      "actionProbationComment",
    ]),
    ...mapActions(useBaseStore, ["snackChange"]),
    addComment(data) {
      this.itemSelected = data;
      this.note = null;
      this.dialogComment = true;
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let paramsAdd = {
          comment: this.note,
          user_id: this.dataLogin.user.id,
        };
        let paramsUpdate = this.itemSelected;
        this.actionProbationComment(paramsAdd, paramsUpdate).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Cập nhật thông tin thành công",
              color: "blue-darken-4",
            });
            this.dialogComment = false;
            this.fetchData();
          }
        });
      }
    },
    fetchData() {
      let params = {
        page: this.page,
        per_page: this.per_page,
      };
      this.fetchListProbation("/probation", params).then((resp) => {
        if (resp) {
          this.items = resp.items;
          this.pageCount = Math.ceil(resp.itemsTotal / this.per_page);
        }
      });
    },
    formatDate(val, str) {
      return moment(val).format(str);
    },
    checkPermission(arr) {
      return baseModel.checkPermission(arr)
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
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>