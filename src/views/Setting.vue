<template>
  <div class="setting">
    <h1 >设置</h1>
    <div style="padding:1rem;">
      <h2>版本</h2>
      <p>{{ $store.state.app.version }}</p>
      <h2>设备号</h2>
      <p>{{ $store.state.cardReader.name }}</p>
      <h2>读卡器连接</h2>
      <p>{{ $store.state.cardReader.isOpen }}</p>
    </div>

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

private mounted(){
  this.CloseDevice();
  this.OpenDevice();
}

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
  color: aliceblue;
}
</style>
