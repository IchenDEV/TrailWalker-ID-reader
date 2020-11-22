<template>
  <v-app>
    <v-navigation-drawer
      style="color:white"
      v-if="$route.name !== 'Show'"
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      permanent
      dark
      expand-on-hover
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="./assets/yx-logo.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              精弘毅行
            </v-list-item-title>
            <v-list-item-subtitle>jh@zjut.edu.cn</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link @click="$router.push('/card-reader')">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>身份证认证</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <template v-slot:append>
        <v-list nav dense>
          <v-list-item link @click="$router.push('/setting')">
            <v-list-item-icon>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title>设置</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      v-if="$route.name !== 'Show'"
      app
      style="-webkit-app-region: drag;"
    >
      <v-btn
        class="mx-2"
        style="color:white;-webkit-app-region: no-drag;"
        small
        color="red"
        @click="createLargeScreenWindow()"
        >外屏</v-btn
      >
      <div class="d-flex align-center">
        <v-img
          alt="JH Logo"
          class="shrink mr-2"
          contain
          src="/jh-logo.png"
          transition="scale-transition"
          width="80"
        />
      </div>

      <v-btn
        class="mx-2"
        style="-webkit-app-region: no-drag;"
        right
        small
        color="primary"
        @click="closeWindows()"
        >X</v-btn
      >
    </v-app-bar>
    <v-main app>
      <router-view></router-view>
    </v-main>
    <v-dialog v-model="$store.state.dialog.show" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ $store.state.dialog.title }}
        </v-card-title>
        <v-card-text>{{ $store.state.dialog.msg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$store.state.dialog.show = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="$store.state.snackbar.show"         :timeout="1500">
      {{ $store.state.snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const { ipcRenderer } = window.require("electron");
@Component({})
export default class App extends Vue {
  private mounted(){
    ipcRenderer.on("machie-id", (e, message) => {this.$store.state.cardReader.name=message});
  }
  private async closeWindows() {
    console.log("close");
    ipcRenderer.send("window-close");
  }
  private createLargeScreenWindow() {
    ipcRenderer.send("createLargeScreenWindow");
  }
}
</script>
<style>

body {
  overflow-y: hidden;
}
#app {
  font-family: "Noto Sans SC" !important;
  background-image: linear-gradient(120deg, #5694dc 0%, #c2e9fb 90%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
}
.v-toolbar__content {
  justify-content: space-between;
}
.v-snack__content{
  font-size: 3rem!important;
  line-height: 9rem!important;
  padding: 4rem!important;
  white-space: pre-line;
}
.v-snack__wrapper{
  max-width: 1000px!important;
}
</style>
