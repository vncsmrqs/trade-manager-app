<template>
  <div>
    <create-setup></create-setup>
    <ul>
      <li v-for="(setup, index) in localState.items" :key="index">{{ setup.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { app } from "@/core/common/container";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup/setup-view.controller";
import { TYPES } from "@/core/common/providers/types";
import CreateSetup from "@/views/settings/setup/components/create-setup.vue";
import { Component, Vue } from "vue-property-decorator";
import { SetupViewState } from "@/core/setup/presentation/states/setup-view.state";

@Component({
  components: { CreateSetup },
})
export default class SetupView extends Vue {
  private setupViewController: SetupViewController = app.make<SetupViewController>(TYPES.SetupViewController);
  private localState: SetupViewState = this.setupViewController.state;

  private created() {
    this.setupViewController.subscribe(this.updateState);
  }

  private updateState(newState) {
    this.localState = newState
  }

  private beforeDestroy() {
    this.setupViewController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
