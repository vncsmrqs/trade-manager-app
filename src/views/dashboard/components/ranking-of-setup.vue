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
            <td class="text-left font-weight-bold">{{ item.position }}º</td>
            <td class="text-left">{{ item.setupNome }}</td>
            <td class="text-center blue--text font-weight-bold">{{ item.gainCount }}</td>
            <td class="text-center red--text text--accent-1 font-weight-bold">{{ item.lossCount }}</td>
            <td class="text-right">{{ item.gainPercentage.toFixed(2) }}%</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";

@Component({})
export default class RankingOfSetup extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

  get items() {
    return this.dashboardState.rankingOfSetups.items.map((setup) => {
      const lossCount = setup.items
          .filter(({ name }) => name === 'loss')
          .reduce((total, { value }) => value + total, 0);

      const gainCount = setup.items
          .filter(({ name }) => name === 'gain')
          .reduce((total, { value }) => value + total, 0);

      const drawCount = setup.items
          .filter(({ name }) => name === '0x0')
          .reduce((total, { value }) => value + total, 0);

      const total = lossCount + gainCount + drawCount;

      return {
        position: setup.position,
        setupNome: setup.setupNome,
        gainCount,
        lossCount,
        drawCount,
        gainPercentage: gainCount * 100 / total,
        lossPercentage: lossCount * 100 / total,
        drawPercentage: drawCount * 100 / total,
      };
    });
  }

  private updateState(newState: DashboardState) {
    this.dashboardState = newState;
  }

  private created() {
    this.dashboardController.subscribe(this.updateState);
    this.dashboardController.resetState();
  }

  private beforeDestroy() {
    this.dashboardController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
