<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Chi tiết công việc</div>
          <div>
            <span
              class="mdi mdi-close text-2xl cursor-pointer"
              @click="dialog = false"
            ></span>
          </div>
        </div>
        <div class="mdi mdi-view-dashboard-outline">
          <span class="font-bold ml-2">{{ dataDetail.name }}</span>
        </div>
        <div class="mdi mdi-view-list">
          <span class="font-medium ml-2">{{ dataDetail.description }}</span>
        </div>
        <div class="flex justify-between items-center my-4">
          <div class="font-bold">- Đầu mục công việc</div>
          <div>
            <v-btn
              variant="flat"
              prepend-icon="mdi:mdi-plus"
              color="blue-darken-4 text-sm"
              size="small"
              @click="addChild()"
              >Thêm đầu mục</v-btn
            >
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div
            class="rounded-lg p-3 hover:shadow-xl hover:bg-gray-200 border-2 bg-gray-100"
            :class="item.priority ? 'border-red-800' : 'border-blue-600 '"
            v-for="(item, index) in dataDetail.task_id"
            :key="index"
          >
            <div
              class="text-sm font-bold text-red-darken-4 my-1"
              v-if="item.priority"
            >
              Việc ưu tiên
            </div>
            <div class="flex justify-between">
              <div class="text-xs">
                <span class="">Ngày tạo: </span
                ><span class="text-green-darken-4 font-bold">{{
                  formatDateVN(item.created_at)
                }}</span>
              </div>
              <div class="text-xs">
                <span class="">Tạo bởi: </span
                ><span class="font-bold">{{ findUser(item.user_id) }}</span>
              </div>
            </div>
            <div class="font-bold my-1 text-sm">
              {{ item.name }}
            </div>
            <div class="text-sm my-1">
              Chi tiết: <span class="font-bold"> {{ item.description }}</span>
            </div>
            <div class="text-xs my-1 flex justify-between">
              <div>
                Từ:
                <span class="font-bold text-blue-darken-4">{{
                  formatDateVN(item.from_date)
                }}</span>
                - Đến:
                <span class="font-bold text-red-darken-4">{{
                  formatDateVN(item.to_date)
                }}</span>
              </div>
              <div
                v-if="!item.progress && checkPermission()"
                class="mdi mdi-pencil cursor-pointer"
                @click="updateDate(item)"
              ></div>
            </div>
            <div class="text-sm my-1 flex justify-between">
              <div>Người phụ trách:</div>
              <span class="font-bold text-orange-darken-4">{{
                findUser(item.assigned_user_id)
              }}</span>
            </div>
            <div class="text-sm my-1 flex justify-between">
              <div>Người giám sát:</div>
              <span class="font-bold text-orange-darken-4">{{
                findUser(item.supervisor_id)
              }}</span>
            </div>
            <div class="text-sm flex justify-between">
              Trạng thái:
              <span
                class="font-bold"
                :class="
                  item.progress ? 'text-blue-darken-4' : 'text-red-darken-4'
                "
                >{{ item.progress ? "Đã xong" : "Đang làm" }}</span
              >
              <span
                class="mdi mdi-pencil cursor-pointer"
                v-if="!item.progress && checkPermission()"
                @click="updateProcessChild(item)"
              ></span>
            </div>
            <div v-if="item.progress" class="text-xs my-1">
              Ngày hoàn thành:
              <span class="font-bold text-blue-darken-4">{{
                formatDateVN(item.updated_at)
              }}</span>
            </div>
            <div
              class="my-1 flex items-center cursor-pointer"
              @click="addComment(item)"
            >
              <span class="mdi mdi-comment-edit-outline"></span
              ><span class="text-xs ml-1 font-bold">Ghi chú</span>
            </div>
            <div
              class="my-1 overflow-auto"
              :class="
                item.comment_id && item.comment_id.length > 0 ? 'h-[200px]' : ''
              "
            >
              <div class="grid gap-2">
                <div v-for="(comment, index) in item.comment_id" :key="index">
                  <div class="border p-2 rounded-lg bg-white">
                    <div class="flex justify-between">
                      <div class="font-bold text-xs">
                        <span class="mdi mdi-account"></span
                        >{{ findUser(comment.user_id) }}
                      </div>
                      <div class="text-blue-darken-4 text-xs">
                        {{ formatDateVN(comment.created_at) }}
                      </div>
                    </div>
                    <div class="text-sm">{{ comment.comment }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="my-1 flex items-center cursor-pointer"
              @click="addImage(item)"
            >
              <input
                hidden
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                ref="uploadimage"
                @change="affterRenderImg($event)"
              />
              <span class="mdi mdi-image-edit"></span
              ><span class="text-xs ml-1 font-bold">Đính kèm hình ảnh</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div
                v-for="(imageItem, index) in item.task_image_id"
                :key="index"
              >
                <img
                  :src="imageItem?.image?.url"
                  class="cursor-pointer hover:scale-105"
                  @click="
                    (imageDialog = true), (imageSelected = imageItem.image.url)
                  "
                />
              </div>
            </div>
            <v-dialog v-model="imageDialog" max-width="600">
              <v-card>
                <v-card-text class="m-auto">
                  <img
                    :src="imageSelected"
                    class="cursor-pointer hover:scale-105"
                  />
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-card-text> </v-card
  ></v-dialog>
  <v-dialog v-model="addDialog" max-width="800" persistent>
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Thêm đầu mục</div>
          <div>
            <span
              class="mdi mdi-close text-2xl cursor-pointer"
              @click="addDialog = false"
            ></span>
          </div>
        </div>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Tiêu đề"
                variant="outlined"
                density="comfortable"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                placeholder="Mô tả chi tiết nội dung công việc"
                label="Nội dung công việc"
                variant="outlined"
                density="comfortable"
                v-model="description"
                :rules="[rules.required]"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Giao cho"
                variant="outlined"
                density="comfortable"
                v-model="assigned_user_id"
                :items="userListData"
                :rules="[rules.required]"
                item-title="name"
                item-value="id"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Người giám sát"
                variant="outlined"
                density="comfortable"
                v-model="supervisor_id"
                :items="userListData"
                :rules="[rules.required]"
                item-title="name"
                item-value="id"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-date-input
                prepend-icon=""
                label="Ngày bắt đầu"
                variant="outlined"
                v-model="fromDate"
                class="p-date hideDate"
                :cancel-text="'Đóng'"
                :hide-actions="true"
                placeholder="dd/mm/yyyy"
                :format="'dd/mm/yyyy'"
                :rules="[rules.required]"
                :min="todayDate"
              >
                <template v-slot:default>
                  {{ fromDateFormated }}
                </template>
              </v-date-input>
            </v-col>
            <v-col cols="4">
              <v-date-input
                prepend-icon=""
                label="Ngày hoàn thành"
                variant="outlined"
                v-model="toDate"
                class="p-date hideDate"
                :cancel-text="'Đóng'"
                :hide-actions="true"
                placeholder="dd/mm/yyyy"
                :format="'dd/mm/yyyy'"
                :rules="[rules.required]"
                :min="todayDate"
              >
                <template v-slot:default>
                  {{ toDateFormated }}
                </template>
              </v-date-input>
            </v-col>
            <v-col cols="4">
              <v-switch label="Ưu tiên" v-model="priority"></v-switch>
            </v-col>
          </v-row>
        </v-form>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3 w-3/5 m-auto"
            @click="submit"
            ><span class="text-md normal-case">Xác nhận</span></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateStatus" max-width="500" persistent>
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Xác nhận hoàn thành công việc?</div>
          <div>
            <span
              class="mdi mdi-close text-2xl cursor-pointer"
              @click="updateStatus = false"
            ></span>
          </div>
        </div>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3 w-3/5 m-auto"
            @click="confirmUpdateStatus"
            ><span class="text-md normal-case">Xác nhận</span></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateTime" max-width="500" persistent>
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Cập nhật thời gian</div>
          <div>
            <span
              class="mdi mdi-close text-2xl cursor-pointer"
              @click="updateTime = false"
            ></span>
          </div>
        </div>
        <v-form
          ref="form1"
          v-model="valid1"
          @submit.prevent="confirmUpdateDate"
        >
          <v-row>
            <v-col cols="6">
              <v-date-input
                prepend-icon=""
                label="Ngày bắt đầu"
                variant="outlined"
                v-model="fromDate"
                class="p-date hideDate"
                :cancel-text="'Đóng'"
                :hide-actions="true"
                placeholder="dd/mm/yyyy"
                :format="'dd/mm/yyyy'"
                :rules="[rules.required]"
                :min="todayDate"
              >
                <template v-slot:default>
                  {{ fromDateFormated }}
                </template>
              </v-date-input>
            </v-col>
            <v-col cols="6">
              <v-date-input
                prepend-icon=""
                label="Ngày hoàn thành"
                variant="outlined"
                v-model="toDate"
                class="p-date hideDate"
                :cancel-text="'Đóng'"
                :hide-actions="true"
                placeholder="dd/mm/yyyy"
                :format="'dd/mm/yyyy'"
                :rules="[rules.required]"
                :min="todayDate"
              >
                <template v-slot:default>
                  {{ toDateFormated }}
                </template>
              </v-date-input>
            </v-col>
          </v-row>
        </v-form>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3 w-3/5 m-auto"
            @click="confirmUpdateDate"
            ><span class="text-md normal-case">Xác nhận</span></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="commentDialog" max-width="500" persistent>
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Thêm ghi chú</div>
          <div>
            <span
              class="mdi mdi-close text-2xl cursor-pointer"
              @click="commentDialog = false"
            ></span>
          </div>
        </div>
        <v-form
          ref="form2"
          v-model="valid2"
          @submit.prevent="confirmAddComment"
        >
          <v-textarea
            label="Ghi chú hoặc đường dẫn file NAS"
            variant="outlined"
            density="comfortable"
            v-model="comment"
            :rules="[rules.required]"
            auto-grow
          ></v-textarea>
        </v-form>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3 w-3/5 m-auto"
            @click="confirmAddComment"
            ><span class="text-md normal-case">Xác nhận</span></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/customerStore";
import moment from "moment";
import { useBaseStore } from "../../stores/baseStore";
import JQuery from "jquery";
export default {
  name: "ParentTaskDetail",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    dataDetail: {
      type: Object,
    },
  },
  emits: ["close", "addChildDone", "updateChildDone"],
  data() {
    return {
      imageDialog: false,
      imageSelected: null,
      commentDialog: false,
      updateTime: false,
      updateStatus: false,
      dialog: false,
      addDialog: false,
      valid: false,
      valid1: false,
      valid2: false,
      name: null,
      description: null,
      fromDate: null,
      fromDateFormated: null,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      rules: {
        required: (v) => !!v || "Vui lòng nhập thông tin",
        rulesPhone: (v) =>
          (v && v.length === 10) || "Vui lòng nhập đúng số điện thoại",
      },
      toDate: null,
      toDateFormated: null,
      priority: false,
      assigned_user_id: null,
      supervisor_id: null,
      comment: null,
    };
  },
  computed: {
    ...mapState(useCustomerStore, ["userListData"]),
    ...mapState(useBaseStore, ["dataLogin"]),
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "addChildAction",
      "updateParentTask",
      "patchStatusChild",
      "updateTaskComment",
      "addImgAction",
      "putImgTaskAction",
    ]),
    ...mapActions(useBaseStore, ["snackChange"]),
    checkPermission() {
      let per = ["admin", "manager", "leader"];
      return per.includes(this.dataLogin.user._permission.permission);
    },
    addChild() {
      this.name = null;
      this.description = null;
      this.assigned_user_id = null;
      this.supervisor_id = null;
      this.fromDate = null;
      this.fromDateFormated = null;
      this.toDate = null;
      this.toDateFormated = null;
      this.idSelected = null;
      this.priority = false;
      this.addDialog = true;
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          created_at: "now",
          name: this.name,
          description: this.description,
          status: 0,
          from_date: this.formatDate(this.fromDate),
          priority: this.priority,
          progress: 0,
          to_date: this.formatDate(this.toDate),
          user_id: this.dataLogin.user.id,
          parent_task_id: this.dataDetail.id,
          assigned_user_id: this.assigned_user_id,
          supervisor_id: this.supervisor_id,
          updated_at: "now",
        };
        this.addChildAction("/task", params).then((resp) => {
          if (resp) {
            this.dataDetail.task_id.push(resp.id);
            let paramsUpdate = {
              task_parent_id: this.dataDetail.id,
              name: this.dataDetail.name,
              description: this.dataDetail.description,
              user_create: this.dataDetail.user_create,
              user_charge: this.dataDetail.user_charge,
              process: this.dataDetail.process,
              task_id: this.dataDetail.task_id,
            };

            this.updateParentTask(
              `/task_parent/${this.dataDetail.id}`,
              paramsUpdate
            ).then((respSub) => {
              if (respSub) {
                this.$emit("addChildDone");
                this.snackChange({
                  status: true,
                  message: "Tạo đầu mục thành công",
                  color: "blue-darken-4",
                });
                this.addDialog = false;
              }
            });
          }
        });
      }
    },

    formatDate(date) {
      if (!date) return null;

      return moment(date).format();
    },
    formatDateVN(date) {
      return moment(date).format("DD/MM/YYYY hh:mm");
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
    updateProcessChild(val) {
      this.updateStatus = true;
      this.idSelected = val;
    },
    confirmUpdateStatus() {
      let params = this.idSelected;
      params.progress = true;
      params.updated_at = this.formatDate(new Date());
      this.patchStatusChild(`/task/${this.idSelected.id}`, params).then(
        (resp) => {
          if (resp) {
            this.$emit("updateChildDone");
            this.snackChange({
              status: true,
              message: "Cập nhật thành công",
              color: "blue-darken-4",
            });
            this.updateStatus = false;
          }
        }
      );
    },
    updateDate(val) {
      this.idSelected = val;
      this.updateTime = true;
    },
    async confirmUpdateDate() {
      const { valid } = await this.$refs.form1.validate();
      if (valid) {
        let params = this.idSelected;
        params.from_date = this.formatDate(this.fromDate);
        params.to_date = this.formatDate(this.toDate);
        params.updated_deadline = this.formatDate(new Date());
        this.patchStatusChild(`/task/${this.idSelected.id}`, params).then(
          (resp) => {
            if (resp) {
              this.$emit("updateChildDone");
              this.snackChange({
                status: true,
                message: "Cập nhật thời gian thành công",
                color: "blue-darken-4",
              });
              this.updateTime = false;
            }
          }
        );
      }
    },
    addComment(val) {
      this.idSelected = val;
      this.comment = null;
      this.commentDialog = true;
    },
    async confirmAddComment() {
      const { valid } = await this.$refs.form2.validate();
      if (valid) {
        let params = {
          comment: this.comment,
          user_id: this.dataLogin.user.id,
        };
        let paramsTask = this.idSelected;
        this.updateTaskComment(
          "/comment",
          params,
          this.idSelected.id,
          paramsTask
        ).then((resp) => {
          if (resp) {
            this.$emit("updateChildDone");
            this.snackChange({
              status: true,
              message: "Thêm ghi chú thành công",
              color: "blue-darken-4",
            });
            this.commentDialog = false;
          }
        });
      }
    },
    addImage(val) {
      this.idSelected = val;

      this.$refs.uploadimage[0].click();
    },
    affterRenderImg(d) {
      var input = d.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.resizeBase64Img(reader.result, 600, 600).then((base64) => {
            let payload = {
              content: base64,
            };
            this.addImgAction("/task_image", payload).then((resp) => {
              if (resp) {
                this.idSelected.task_image_id.push(resp.id);
                this.putImgTaskAction(
                  `/task/${this.idSelected.id}`,
                  this.idSelected
                ).then((respTask) => {
                  if (respTask) {
                    this.$emit("updateChildDone");
                  }
                });
              }
            });
          });
        };

        reader.onerror = function (error) {
          console.log("Update avatar failture.");
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    resizeBase64Img: function (base64, width, height) {
      let $ = JQuery;
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext("2d");
      var deferred = $.Deferred();

      var img = new Image();

      img.onload = function () {
        context.scale(width / this.width, height / this.height);
        context.drawImage(this, 0, 0);
        deferred.resolve(canvas.toDataURL());
      };
      img.src = base64;

      return deferred.promise();
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("close", val);
    },
    fromDate(val) {
      if (val) this.fromDateFormated = moment(val).format("DD/MM/YYYY");
    },
    toDate(val) {
      if (val) this.toDateFormated = moment(val).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
</style>