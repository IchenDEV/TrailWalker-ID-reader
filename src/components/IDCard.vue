<template>
  <v-card
    raised
    style="padding:1rem;padding-top:3rem"
    rounded="xl"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-2">
          精弘毅行
        </div>
        <v-list-item-title class="headline mb-2">
          {{
            $store.state.currentIDCard.partyName !== ""
              ? $store.state.currentIDCard.partyName
              : "精小弘"
          }}
        </v-list-item-title>
        <v-list-item-subtitle>{{
          $store.state.currentIDCard.certNumber !== ""
            ? $store.state.currentIDCard.certNumber
            : "330106202011280000"
        }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{
          $store.state.currentIDCard.certOrg !== ""
            ? $store.state.currentIDCard.certOrg
            : "浙江工业大学"
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey" height="6rem">
        <v-img
          :src="
            $store.state.currentIDCard.identityPic !== ''
              ? 'data:image/jpeg;base64,' +
                $store.state.currentIDCard.identityPic
              : null
          "
        >
        </v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class IDCard extends Vue {}
</script>
