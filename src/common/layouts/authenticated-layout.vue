<template>
  <div>
    <logout
        :show="showLogoutDialog"
        @close="closeLogout"
    ></logout>
    <v-navigation-drawer
        v-model="systemState.navigationDrawer"
        class="elevation-3"
        style="border-color: transparent"
        app
    >
      <template v-slot:prepend>
        <v-row justify="center" class="my-4">
          <v-avatar
              class="overflow-hidden"
              color="grey"
              size="164"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-row>
      </template>

      <v-list dense nav>
        <div v-for="(item, i) in systemState.menuItems" :key="i">
          <v-list-item
              v-if="!item.group"
              :to="{ name: item.routeName }"
              link
              color="primary"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-title>
          </v-list-item>

          <v-list-group
              v-else
              :value="false"
              :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>Configurações</v-list-item-title>
            </template>

            <v-list-item
                v-for="({ title, routeName }, i) in item.group"
                :key="i"
                link
                :to="{ name: routeName }"
            >
              <v-list-item-icon></v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-list dense nav>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <!--    <v-app-bar app color="white" elevation="0" class="grey lighten-5">-->
    <!--      -->
    <!--      <v-toolbar-title>{{ systemState.pageTitle }}</v-toolbar-title>-->
    <!--    </v-app-bar>-->

    <v-main class="grey lighten-5">
      <v-container class="px-8 pt-9 pb-4">
        <v-row>
          <v-col>
            <h1 class="font-weight-medium">{{ systemState.pageTitle }}</h1>
          </v-col>
        </v-row>
      </v-container>
      <router-view/>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Notification from "@/common/components/notification.vue";
import { app, TYPES } from "@/core/common/container";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import Logout from "@/common/components/logout.vue";

@Component({
  components: { Logout, Notification },
})
export default class AuthenticatedLayout extends Vue {
  private systemController: SystemController = app.make<SystemController>(TYPES.SystemController);
  private authController: AuthController = app.make<AuthController>(TYPES.AuthController);

  private systemState = this.systemController.state;
  private authState = this.authController.state;

  showLogoutDialog = false;

  logout() {
    this.showLogoutDialog = true;
  }

  closeLogout() {
    this.showLogoutDialog = false;
  }

  private updateSystemState(newState) {
    this.systemState = newState;
  }

  private updateAuthState(newState) {
    this.authState = newState;
  }

  private created() {
    this.systemController.subscribe(this.updateSystemState);
    this.authController.subscribe(this.updateAuthState);
  }

  private beforeDestroy() {
    this.systemController.unsubscribe(this.updateSystemState);
    this.authController.unsubscribe(this.updateAuthState);
  }
}
</script>

<style scoped>

</style>
