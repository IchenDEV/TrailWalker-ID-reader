<template>
  <div>
    <v-img
      style="position: absolute; right: 1rem;bottom: 1rem;"
      :src="require('../assets/jh-logo.png')"
      height="60"
      width="150"
    ></v-img>
    <v-img
      style="position: absolute; left: 1rem;top: 1rem;"
      :src="require('../assets/yx-logo.png')"
      height="200"
      width="200"
    ></v-img>

    <div
      class="d-flex"
      style="flex-wrap:wrap;justify-content: center;align-items: center;height:100vh"
    >
      <i-d-card class="mx-auto"  style="max-width:344px;max-height:340px;transform: scale(1.5);"></i-d-card>
      <group-card  class="mx-auto" style="width:500px;height:350px;transform: scale(1.5);"></group-card>
      <v-snackbar
        v-model="snackbar"
        centered
        elevation="24"
        :timeout="3000"
        :color="color"
      >
        {{ text }}
      </v-snackbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IDCard from "@/components/IDCard.vue";
import GroupCard from "@/components/GroupCard.vue";
const { ipcRenderer } = window.require("electron");
@Component({ components: { IDCard, GroupCard } })
export default class ShowView extends Vue {
  private group: any;
  private IDCard: any;
  private snackbar = false;
  private text = "";
  private color = "red";
  private mounted() {
    ipcRenderer.on("messagePushFromMain", (e, message) => this.load(message));
    ipcRenderer.on("showInfoFromMain", (e, message) => this.show(message));
  }
  private load(message: any) {
    this.$store.state.currentGroup = message.group;
    this.$store.state.currentIDCard = message.idcard;
  }
  private show(message: any) {
    console.log(message);
    this.snackbar = true;
    this.text = message.text;
    this.color = message.color;
  }
}
</script>
<style scoped>
.show {
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
