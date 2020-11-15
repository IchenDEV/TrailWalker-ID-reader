import Vue from 'vue'
import Vuex from 'vuex'
import { API, apiMap } from "@/utils/api/api";
import { postData } from "@/utils/fetch";
const { ipcRenderer } = window.require("electron");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIDCard: {
      partyName: "精小弘",
      identityPic: "",
      certNumber: "2020精弘毅行欢迎你",
      resultFlag: -1
    },
    cardReader: {
      name: "0001号机",
      isOpen: false,
      interval: 800,
      mode: 0
    },
    dialog: {
      show: false,
      title: "",
      msg: ""
    },
    snackbar: {
      show: false,
      text: ""
    },
    currentGroup: {
      name: "",
      route: "",
      groupId: "",
      memberList: []
    },
    isDebugMode: true

  },
  mutations: {
    setCurrentIDCard(state, payload) {
      state.currentIDCard = payload;
      ipcRenderer.send('messagePush', { group: state.currentGroup, idcard: state.currentIDCard });
    },

    setIDCardReaderState(state, payload: boolean) {
      state.cardReader.isOpen = payload;
    },
    setGroup(state, payload) {
      state.currentGroup = payload;
      ipcRenderer.send('messagePush', { group: state.currentGroup, idcard: state.currentIDCard });
    },
    setDialog(state, payload) {
      state.dialog = payload;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
    }
  },
  actions: {
    async fetchUserInfo(context, payload) {
      const response = await postData(API(apiMap.userInfo), { idcard: payload.certNumber, pass: "QWERT" });
      if (response.code === 1) {
        context.commit("setCurrentIDCard", { certNumber: payload.certNumber, partyName: response.data.name });
      }
      else {
        context.commit("setCurrentIDCard", { certNumber: payload.certNumber });
        context.commit("setDialog", { show: true, title: "出错了", msg: response.msg });
        context.commit("setGroup", { name: "", route: "", groupId: "", memberList: [] });
      }

    },
    async fetchGroupInfo(context, payload) {
      const response = await postData(API(apiMap.groupInfo), { idcard: payload.idcard.certNumber, mode: payload.reader.mode, pass: "QWERT" });
      if (response.code === 1) {
        context.commit("setGroup", response.data);
      }
      else {
        context.commit("setDialog", { show: true, title: "出错了", msg: response.msg });
        context.commit("setGroup", { name: "", route: "", groupId: "", memberList: [] });
      }

    },
    async recodeIDCard(context, payload) {

      const response = await postData(API(apiMap.recode), { idcard: payload.idcard.certNumber, mode: payload.reader.mode, reader: payload.reader.name, pass: "QWERT" });
      if (response.code === 1) {
        context.commit("setSnackbar", { show: true, text: "刷卡成功" });
        ipcRenderer.send('showInfo', { text: "欢迎" + payload.idcard.partyName === undefined ? "" : payload.idcard.partyName + "，刷卡成功\r\n欢迎参加本次精弘毅行\r\n一起大声地告诉世界 “我来了！”", color: "primary" });
      }
      else {
        context.commit("setDialog", { show: true, title: "出错了", msg: response.msg });
        context.commit("setGroup", { name: "", route: "", groupId: "", memberList: [] });
        ipcRenderer.send('showInfo', { text: response.msg, color: "red" });
      }
    },
    async connentCardReader(context) {
      const response = await fetch("http://localhost:19196/OpenDevice");
      const res = await response.json();
      if (res.resultFlag === 0) {
        context.commit('setIDCardReaderState', true)
      }
      else {
        context.commit('setIDCardReaderState', false)
        context.commit("setDialog", { show: true, title: "出错了", msg: "未连接到刷卡机" });
      }
    },
    async closeCardReader() {
      const response = await fetch("http://localhost:19196/CloseDevice");
      return response.json();
    },
    async readCard(context) {
      const response = await fetch("http://localhost:19196/readCard");
      const blob = await response.blob()
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Wait till complete
        reader.onloadend = function (e: any) {
          const text = reader.result?.toString();
          if (text) {
            const idcard = JSON.parse(text)
            if (idcard.resultFlag === 0) {
              context.commit('setCurrentIDCard', idcard);
              resolve(true);

            }else if (idcard.resultFlag === -11) { resolve(false); } else {
              context.commit('setIDCardReaderState', false);
              context.commit('setCurrentIDCard', {partyName: "精小弘", identityPic: "", certNumber: "2020精弘毅行欢迎你", resultFlag: -1});
              resolve(false);
            }

          }
          resolve(false);
        };
        // Make sure to handle error states
        reader.onerror = function (e: any) {
          reject(e);
        };
        reader.readAsText(blob, 'UTF-8');
      });
    },
    async readSamId() {
      const response = await fetch("http://localhost:19196/getsamid");
      return response.json();
    }
  },
  modules: {
  }
})
