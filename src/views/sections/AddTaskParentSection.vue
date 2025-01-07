<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text>
        <div class="flex justify-between mb-5">
          <div class="font-bold text-xl">Thêm công việc</div>
          <div>
            <span class="mdi mdi-close text-xl" @click="dialog = false"></span>
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
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                placeholder="Mô tả chi tiết nội dung công việc"
                label="Nội dung công việc"
                variant="outlined"
                density="comfortable"
                v-model="description"
                :rules="rules"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Giám sát tổng"
                variant="outlined"
                density="comfortable"
                v-model="user_charge"
                :items="userListData"
                :rules="rules"
                item-title="name"
                item-value="id"
              >
              </v-autocomplete>
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
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/customerStore";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "AddTaskParentSection",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["addTaskParentDone", "close"],
  data() {
    return {
      dialog: false,
      valid: false,
      name: null,
      description: null,
      user_charge: null,
      process: 0,
      rules: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
    };
  },
  computed: {
    ...mapState(useCustomerStore, ["userListData"]),
    ...mapState(useBaseStore, ["dataLogin"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["addParentTaskAcction"]),
    ...mapActions(useBaseStore, ["snackChange"]),
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          name: this.name,
          description: this.description,
          user_create: this.dataLogin.user.id,
          user_charge: this.user_charge,
          task_id: [],
          process: 0,
        };
        this.addParentTaskAcction("/task_parent", params).then((resp) => {
          if (resp) {
            this.$emit("addTaskParentDone");
            this.snackChange({
              status: true,
              message: "Tạo công việc thành công",
              color: "blue-darken-4",
            });
          }
        });
      }
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.name = null;
        this.description = null;
        this.user_charge = null;
      }
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("close", val);
    },
  },
};
</script>

<style>
</style>