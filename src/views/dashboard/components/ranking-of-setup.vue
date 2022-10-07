<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title>
      Ranking por setup
    </v-card-title>
    <v-card-text class="">
      <v-simple-table dense class="v-sheet--outlined">
        <template v-slot:default>
          <tbody>
          <tr v-for="(item, i) in items" :key="i">
            <td class="text-left font-weight-bold">{{ item.position }}</td>
            <td class="text-left">{{ item.setupNome }}</td>
            <td class="text-center blue--text font-weight-bold">{{ item.gainCount }}</td>
            <td class="text-center red--text text--accent-1 font-weight-bold">{{ item.lossCount }}</td>
            <td class="text-right">{{ item.gainPercentage }}%</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class RankingOfSetup extends Vue {
  items = [
    {
      position: 1,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 2,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 3,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 4,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 5,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 6,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
    {
      position: 7,
      setupNome: 'Movimento - Clássico Perto',
      gainCount: 23,
      lossCount: 7,
      gainPercentage: 76.67,
    },
  ];
}
</script>

<style scoped>

</style>
