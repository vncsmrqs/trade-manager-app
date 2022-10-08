<template>
  <v-app id="inspire">
    <v-overlay v-show="showSplash" color="white">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
import { app, TYPES } from "@/core/common/container";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { Watch } from "vue-property-decorator";

@Component({
  components: { Notification },
})
export default class App extends Vue {
  private authController = app.make<AuthController>(TYPES.AuthController);
  private authState = this.authController.state;

  showSplash = true;

  get isLoadingSession() {
    return this.authController.isLoadingSession;
  }

  @Watch('isLoadingSession')
  changeSplash(value: boolean) {
    console.log('isLoadingSession', value);
    if (!value) {
      this.showSplash = false;
    }
  }

  private updateAuthState(newState: AuthState) {
    this.authState = newState;
  }

  private created() {
    this.authController.subscribe(this.updateAuthState);
    if (!this.isLoadingSession) {
      this.authController.loadSession().then(() => {
        this.showSplash = false;
      });
    }
  }

  private beforeDestroy() {
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
