<template>
  <div v-resize="onResize">
    <v-overlay
      v-if="overlayStatus"
      persistent
      v-model="overlayStatus"
      style="z-index: 9999"
      class="align-center justify-center"
    >
      <img src="@/assets/images/loading.gif" width="64" v-if="overlayStatus" />
    </v-overlay>
    <v-snackbar
      location="top right"
      v-model="snackData.status"
      :timeout="timeOut"
      :color="snackData.color"
    >
      {{ snackData.message }}</v-snackbar
    >
    <RouterView />
  </div>
</template>
<script>
import { useBaseStore } from "@/stores/baseStore";
import { mapState, mapWritableState } from "pinia";
export default {
  name: "App",
  data() {
    return {
      overlayStatus: false,
      snackData: {
        status: false,
        message: "",
        color: "",
      },
      timeOut: 5000,
      windowSize: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    ...mapState(useBaseStore, ["overlay", "snack"]),
    ...mapWritableState(useBaseStore, ["windowReSize"]),
  },
  watch: {
    snack(val) {
      this.snackData = val;
    },
    overlay(val) {
      this.overlayStatus = val;
    },
  },
  mounted() {
    this.onResize();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.windowReSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
};
</script>


