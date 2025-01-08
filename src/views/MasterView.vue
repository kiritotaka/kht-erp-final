<template>
  <MenuComponentVue />
  <!-- Content -->
  <div class="w-full pt-10 sm:px-6 md:px-8 lg:pl-72">
    <router-view></router-view>
  </div>
  <!-- End Content -->
</template>

<script>
import { mapActions } from "pinia";
import MenuComponentVue from "../components/MenuComponent.vue";
import { useCustomerStore } from "../stores/customerStore";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "MasterPage",
  components: {
    MenuComponentVue,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useCustomerStore, ["getListUser"]),
    ...mapActions(useBaseStore, ["getListDepartment", "getlistPermission"]),
    fetchUser() {
      this.getListUser("/user");
    },
    fetchDepartment() {
      this.getListDepartment("/department");
    },
    fetchPermission() {
      this.getlistPermission("/permission");
    },
  },
  created() {
    this.fetchUser();
    this.fetchDepartment();
    this.fetchPermission();
  },
};
</script>

<style>
</style>