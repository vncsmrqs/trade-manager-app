<template>
  <v-container class="pa-8">

    <v-row>
      <v-col>
        <v-text-field
          v-model="searchTerm"
          outlined
          dense
          label="Busca"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          outlined
          color="primary"
          style="height: 40px"
          @click="search"
        >Buscar</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              style="height: 40px"
              @click="createItem"
          >Novo</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-data-table
        :headers="headers"
        :items="localState.items"
        class="elevation-1"
        hide-default-footer
        :loading="isLoading"
        loading-text="Buscando setups..."
        no-data-text="Nenhum setup encontrado"
    >

      <template v-slot:top>
        <delete-setup
            :id="itemToDelete"
            :show="showDeleteDialog"
            @close="closeDeleteDialog"
        ></delete-setup>
        <create-or-update-setup
            :item="itemToUpdate"
            :show="showCreateOrUpdateDialog"
            @close="closeCreateOrUpdateDialog"
        ></create-or-update-setup>
      </template>

      <template v-slot:[`item.ativo`]="{ item }">
        <v-switch
            small
            class="mr-2"
            :value="item.active"
            dense
            @change="(value) => toggleAtivo(item, value)"
        >
          mdi-pencil
        </v-switch>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="() => updateItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="() => deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-row v-if="showPagination" justify="end" class="mt-2">
      <v-col v-if="isLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <span class="ml-4">Buscando...</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-pagination
            :value="pagination.page"
            @input="changePage"
            :length="pagination.pageCount"
        ></v-pagination>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { app } from "@/core/common/container";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { SetupViewState } from "@/core/setup/presentation/states/setup-view.state";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import DeleteSetup from "@/views/configuracoes/setups/components/delete-setup.vue";
import CreateOrUpdateSetup from "@/views/configuracoes/setups/components/create-or-update-setup.vue";

@Component({
  components: { CreateOrUpdateSetup, DeleteSetup },
})
export default class SetupView extends Vue {
  private setupViewController: SetupViewController = app.make<SetupViewController>(TYPES.SetupViewController);
  private localState: SetupViewState = this.setupViewController.state;

  searchTerm = '';

  itemToUpdate!: SetupEntity = null;
  itemToDelete!: SetupEntity = null;

  showDeleteDialog = false;
  showCreateOrUpdateDialog = false;

  get pagination() {
    return {
      page: this.localState.page,
      itemsPerPage: this.localState.itemsPerPage,
      pageCount: this.localState.pageCount,
    }
  }

  get showPagination(): boolean{
    if (this.localState.items) {
      return this.localState.items.length > this.pagination.itemsPerPage;
    }
    return false;
  }

  async search(): Promise<void> {
    await this.setupViewController.loadSetupList({
      search: this.searchTerm,
    });
  }

  closeDeleteDialog() {
    this.itemToDelete = {};
    this.showDeleteDialog = false;
  }

  closeCreateOrUpdateDialog() {
    this.itemToUpdate = null;
    this.showCreateOrUpdateDialog = false;
  }

  deleteItem(item) {
    this.itemToDelete = Object.assign({}, item);
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingSetupViewState';
  }

  get headers() {
    return [
      {
      text: 'NOME',
        align: 'start',
        sortable: false,
        value: 'name',
        width: '70%',
      },
      {
        text: 'ATIVO',
        value: 'ativo',
        sortable: false,
        width: '15%',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        width: '15%',
      },
    ];
  }

  private async changePage(page: number): Promise<void> {
    await this.setupViewController.goToPage(page);
  }

  private async toggleAtivo(item: SetupEntity, value: boolean) {
    await this.setupViewController.changeAtivo(item.id, value);
  }

  private createItem() {
    this.itemToUpdate = null;
    this.showCreateOrUpdateDialog = true;
  }

  private updateItem(item: SetupEntity) {
    this.itemToUpdate = item;
    this.showCreateOrUpdateDialog = true;
  }

  private created() {
    this.setupViewController.subscribe(this.updateState);
    this.setupViewController.resetState();
  }

  private updateState(newState: SetupViewState) {
    this.localState = newState;
  }

  public mounted() {
    this.setupViewController.loadSetupList();
  }

  private beforeDestroy() {
    this.setupViewController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
