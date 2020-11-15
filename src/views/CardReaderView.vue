<template>
  <div
    style="padding:1rem;text-align: center;overflow:auto;min-height:300px;height:97vh"
  >
    <div
      class="d-flex"
      style="flex-wrap:wrap;justify-content: center;align-items: center;"
    >
      <i-d-card  style="max-width:324px;min-height:280px;" ></i-d-card>
      <group-card   style="min-width:400px;min-height:350px;"></group-card>
    </div>
    <v-card
      rounded="xl"
      raised
      class="ph-2 mb-4"
      style="padding:1rem;margin:1rem"
    >
      <v-slider
        class="mb-4"
        v-model="$store.state.cardReader.mode"
        :tick-labels="labels"
        :max="2"
        solo
        step="1"
        ticks="always"
        tick-size="4"
      ></v-slider
    ></v-card>
    <v-card
      rounded="xl"
      raised
      class="ph-2 mb-4"
      style="padding:1rem;margin:1rem"
    >
      <v-text-field
        label="身份证手工录入"
        v-model="idcard"
        solo
        style="display:inline"
      ></v-text-field>
      <v-btn @click="setCardmanually()">身份证手工录入</v-btn>
      <v-btn @click="ReadCard">读卡</v-btn>
      <v-btn v-if="!isCircleReading" @click="StartCircleReadCard()"
        >循环读卡</v-btn
      >
      <v-btn v-else @click="StopCircleReadCard()">停止循环读卡</v-btn>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IDCard from "@/components/IDCard.vue";
import GroupCard from "@/components/GroupCard.vue";

@Component({ components: { IDCard, GroupCard } })
export default class CardReaderView extends Vue {
  public isCircleReading = false;
  public CircleReadingInterval = 0;
  public labels = ["起点", "下撤终点", "完成终点"];
  private idcard = "";
  private mounted() {
    this.$store.dispatch("connentCardReader");
  }

  private async getGroupInfo() {
    await this.$store.dispatch("fetchGroupInfo", {
      idcard: this.$store.state.currentIDCard,
      reader: this.$store.state.cardReader,
    });
  }

  private async recode() {
    await this.$store.dispatch("recodeIDCard", {
      idcard: this.$store.state.currentIDCard,
      reader: this.$store.state.cardReader,
    });
  }

  private async setCardmanually() {
    if (this.idcard !== "") {
      await this.$store.dispatch("fetchUserInfo", { certNumber: this.idcard });
      await this.recode();
      await this.getGroupInfo();
    }
  }
  private async OpenDevice() {
    await this.$store.dispatch("closeCardReader");
    await this.$store.dispatch("connentCardReader");
  }

  private async ReadCard() {
    if (!this.$store.state.cardReader.isOpen) {
      await this.OpenDevice();
    }
    await this.$store.dispatch("readCard");
    const code = this.$store.state.currentIDCard.resultFlag;
    if (code === 0) {
      await this.recode();
      await this.getGroupInfo();
    }
  }

  private StopCircleReadCard() {
    this.isCircleReading = false;
    if (this.CircleReadingInterval !== 0)
      window.clearInterval(this.CircleReadingInterval);
  }
  private destroyed() {
    this.StopCircleReadCard();
    this.$store.dispatch("closeCardReader");
  }

  private StartCircleReadCard() {
    if (this.$store.state.cardReader.isOpen) {
      this.isCircleReading = true;
      this.CircleReadingInterval = window.setInterval(
        this.ReadCard,
        this.$store.state.cardReader.interval
      );
    }
  }
}
</script>
