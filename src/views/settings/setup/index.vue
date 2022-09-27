<template>
  <div>
    <create-setup @cancel="isShowingCreateSetup = false"></create-setup>
    <ul>
      <li v-for="(setup, index) in state.items" :key="index">{{ setup.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { app } from "@/core/common/container";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import useStateControllerMixin from "@/common/use-state-controller";
import { TYPES } from "@/core/common/providers/types";
import { SetupListState } from "@/core/setup/presentation/states/setup-list.state";
import CreateSetup from "@/views/settings/setup/components/create-setup.vue";
import { Component, Mixins } from "vue-property-decorator";

const controller = app.make<SetupViewController>(TYPES.SetupViewController);
const StateControllerMixin = useStateControllerMixin<SetupListState>(controller);

@Component({
  components: { CreateSetup },
})
export default class SetupView extends Mixins(StateControllerMixin) {
  state!: SetupListState;
  isShowingCreateSetup = false;
}
</script>

<style scoped>

</style>
