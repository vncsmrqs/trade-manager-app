<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
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
        <div v-for="(item, i) in menuItems" :key="i">
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
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="logout">
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <notification></notification>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Notification from "@/common/components/notifier.vue";

@Component({
  components: { Notification },
})
export default class App extends Vue {
  drawer = null;
  state = {
    user: {
      name: 'Vinicius',
      lastname: 'Marques',
      image: 'https://randomuser.me/api/portraits/women/81.jpg',
    },
  }

  menuItems = [
    {
      title: 'Dashboard',
      routeName: 'dashboard',
      icon: 'mdi-chart-bar',
    },
    {
      title: 'Registros',
      routeName: 'trades',
      icon: 'mdi-swap-vertical',
    },
    {
      title: 'Configurações',
      routeName: 'configuracoes',
      icon: 'mdi-cog',
      group: [
        {
          title: 'Setup',
          routeName: 'configuracoes.setups',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'Gatilhos',
          routeName: 'configuracoes.gatilhos',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'Tipo de entrada',
          routeName: 'configuracoes.tipos-entradas',
          icon: 'mdi-view-dashboard',
        },
      ],
    },
  ]

  logout() {
    //confirmar saída
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
