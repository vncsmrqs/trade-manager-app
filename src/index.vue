<template>
  <v-app id="inspire">
    <v-overlay v-show="showSplash" color="white">
      <v-img width="100px" :src="systemController.iconSrc" class="mb-8"></v-img>
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-overlay>
    <template v-if="!showSplash">
      <router-view></router-view>
    </template>
    <notification></notification>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Notification from "@/common/components/notification.vue";
import { AuthState } from "@/core/auth/presentation/states/auth.state";
import { SystemState } from "@/core/system/presentation/states/system.state";
import { app, TYPES } from "@/core/common/container";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { Watch } from "vue-property-decorator";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";

@Component({
  components: { Notification },
})
export default class App extends Vue {
  private authController = app.make<AuthController>(TYPES.AuthController);
  private authState = this.authController.state;

  private systemController: SystemController = app.make<SystemController>(TYPES.SystemController);
  private systemState = this.systemController.state;

  showSplash = true;

  get isLoadingSession() {
    return this.authController.isLoadingSession;
  }

  @Watch('isLoadingSession')
  changeSplash(value: boolean) {
    if (!value) {
      this.showSplash = false;
    }
  }

  private updateAuthState(newState: AuthState) {
    this.authState = newState;
  }

  private updateSystemState(newState: SystemState) {
    this.systemState = newState;
  }

  @Watch('systemState.appTitle')
  changeAppTitle(title: string) {
    document.title = title;
  }

  private created() {
    this.systemController.subscribe(this.updateSystemState);
    this.authController.subscribe(this.updateAuthState);
    this.authController.loadSession().finally(() => {
      this.showSplash = false;
    });
    this.changeAppTitle(this.systemState.appTitle);
  }

  private beforeDestroy() {
    this.systemController.unsubscribe(this.updateSystemState);
    this.authController.unsubscribe(this.updateAuthState);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
