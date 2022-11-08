<template>
  <div>
    <logout
        :show="showLogoutDialog"
        @close="closeLogoutDialog"
    ></logout>
    <change-password
        :show="showChangePasswordDialog"
        @close="closeChangePasswordDialog"
    ></change-password>
    <v-navigation-drawer
        v-model="systemState.navigationDrawer"
        class="elevation-3"
        style="border-color: transparent"
        app
    >
      <template v-slot:prepend>
        <v-row justify="center" class="my-8">
          <v-avatar size="128">
            <v-img :src="systemController.iconSrc"></v-img>
          </v-avatar>
        </v-row>
      </template>

      <v-list dense nav>
        <div v-for="(item, i) in systemState.menuItems" :key="i">
          <template v-if="authController.userCan(item.abilities)">
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
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </template>

              <v-list-item
                  v-for="({ title, routeName }, i) in item.group"
                  :key="i"
                  link
                  :disabled="!authController.userCan(item.abilities)"
                  :to="{ name: routeName }"
              >
                <v-list-item-icon></v-list-item-icon>
                <v-list-item-title v-text="title"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="3">
      <v-spacer></v-spacer>
      <v-menu
          offset-y
          min-width="300px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
              color="grey lighten-3"
              v-bind="attrs"
              v-on="on"
              class="white--text"
          >
            <v-img
                v-if="authController.userHasImage"
                :src="authState.user.imageUrl"
            ></v-img>
            <v-icon v-else large>mdi-account</v-icon>
          </v-avatar>
        </template>

        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ authState.user?.name }} {{ authState.user?.lastname }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ authState.user?.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nav @click="changePassword">
            <v-list-item-content>
                <v-list-item-title>Alterar senha</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nav @click="logout">
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

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
import { app, TYPES } from "@/core/common/container";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import Logout from "@/common/components/logout.vue";
import { SystemState } from "@/core/system/presentation/states/system.state";
import { AuthState } from "@/core/auth/presentation/states/auth.state";
import ChangePassword from "@/common/components/change-password.vue";

@Component({
  components: { ChangePassword, Logout },
})
export default class AuthenticatedLayout extends Vue {
  private systemController: SystemController = app.make<SystemController>(TYPES.SystemController);
  private authController: AuthController = app.make<AuthController>(TYPES.AuthController);

  private systemState = this.systemController.state;
  private authState = this.authController.state;

  showLogoutDialog = false;
  showChangePasswordDialog = false;

  logout() {
    this.showLogoutDialog = true;
  }

  closeLogoutDialog() {
    this.showLogoutDialog = false;
  }

  changePassword() {
    this.showChangePasswordDialog = true;
  }

  closeChangePasswordDialog() {
    this.showChangePasswordDialog = false;
  }

  private updateSystemState(newState: SystemState) {
    this.systemState = newState;
  }

  private updateAuthState(newState: AuthState) {
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
