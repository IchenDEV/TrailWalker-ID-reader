<template>
  <v-card style="margin:1rem;padding:1rem"   rounded="xl" raised>
    <v-img max-height="350" max-width="350" v-if="$store.state.currentGroup.groupId===''" :src="require('../assets/runing.svg')" ></v-img>
    <v-card-title>
      {{ $store.state.currentGroup.name }}
    </v-card-title>
     <v-card-subtitle>
      {{ $store.state.currentGroup.groupId }}
      {{ $store.state.currentGroup.route }}
    </v-card-subtitle>
    <div class="d-flex" style="flex-wrap:wrap;justify-content: center;">
      <v-card           height="50"
          width="50" v-for="(i,index) in $store.state.currentGroup.member_list" :key="index" rounded="xl" raised style="margin:0.2rem">
        <v-img
        v-if="i.state===0"
          :src="i.logo"
          contain
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        />
          <v-img
          v-else
          :src="i.logo"
          contain
        />
        <v-card-title>
          {{i.name}}
        </v-card-title>
      </v-card>
      
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class GroupCard extends Vue {



}
</script>
<style scoped></style>
