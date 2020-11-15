<template>
  <div class="setting">
    <h1>设置</h1>
    <div v-if="$store.state.isDebugMode" class="setting">
      <v-switch></v-switch>
      <v-switch></v-switch>
      <v-switch></v-switch>
      <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
      <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
      <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
      <v-btn @click="createLargeScreenWindow">Open</v-btn>
      <v-btn @click="OpenDevice">Open</v-btn>
      <v-btn @click="ReadCard">Read</v-btn>
      <v-btn @click="CloseDevice">Close</v-btn>
      <v-btn @click="$router.push('/card-reader')">Open</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const { ipcRenderer } = window.require("electron");
@Component({})
export default class Setting extends Vue {
  private async OpenDevice() {
    await this.$store.dispatch("connentCardReader");
  }

  private async ReadCard() {
    await this.$store.dispatch("readCard");
  }
  private async CloseDevice() {
    await this.$store.dispatch("closeCardReader");
  }
  private createLargeScreenWindow() {
    ipcRenderer.send("createLargeScreenWindow");
  }
}
</script>
<style scoped>
.setting {
  padding: 1rem;
}
</style>
