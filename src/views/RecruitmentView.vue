<template>
  <div class="border p-3">
    <div>Tạo yêu cầu tuyển dụng</div>
    <v-form v-model="valid" ref="form"  @submit.prevent="submit">
        <div class="grid">

        </div>
    </v-form>
  </div>
</template>

<script>
import { useCustomerStore } from "../stores/customerStore";
export default {
  name: "RecruitmentPage",
  data() {
    return {};
  },
  methods:{
    async submit(){

    }
  }
};
</script>

<style>
</style>