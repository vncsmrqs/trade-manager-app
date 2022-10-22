<template>
  <v-container class="pa-8">

    <v-form @submit.prevent="search" :disabled="isLoading">
      <v-row>
        <v-col cols="8" sm="6">
          <v-text-field
              v-model="searchTerm"
              outlined
              dense
              label="Busca"
              style="background-color: white"
              hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="2">
          <v-btn
              outlined
              color="primary"
              style="height: 40px; background-color: white"
              @click="search"
              block
              :disabled="isLoading"
          >
            <v-icon left>mdi-magnify</v-icon>
            <span>Buscar</span>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="12" sm="2" class="d-flex mb-8 mb-sm-0">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              style="height: 40px"
              @click="createItem"
              block
          >
            <v-icon left>mdi-plus</v-icon>
            <span>Novo</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-data-table
        :headers="headers"
        :items="localState.items"
        class="elevation-1 mt-8"
        hide-default-footer
        :loading="isLoading"
        loading-text="Buscando setups..."
        no-data-text="Nenhum setup encontrado"
    >

      <template v-slot:top>
        <delete-setup
            :item="itemToDelete"
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
            :input-value="item.ativo"
            dense
            @change="() => toggleAtivo(item, !item.ativo)"
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

    <v-row v-if="showPagination" align="center" class="mt-2">
      <v-col
        v-if="isLoading"
        class="d-flex align-center justify-center justify-sm-start"
        cols="12" sm="6" md="auto"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <span class="ml-4">Buscando...</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
        <v-pagination
            :disabled="isLoading"
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
import { ListSetupController } from "@/core/setup/presentation/controllers/list-setup.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { ListSetupState } from "@/core/setup/presentation/states/list-setup.state";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import DeleteSetup from "@/views/configuracoes/setups/components/delete-setup.vue";
import CreateOrUpdateSetup from "@/views/configuracoes/setups/components/create-or-update-setup.vue";

@Component({
  components: { CreateOrUpdateSetup, DeleteSetup },
})
export default class ListSetup extends Vue {
  private listSetupController: ListSetupController = app.make<ListSetupController>(TYPES.ListSetupController);
  private localState: ListSetupState = this.listSetupController.state;

  searchTerm = '';

  itemToUpdate?: SetupEntity = null;
  itemToDelete?: SetupEntity = null;

  showDeleteDialog = false;
  showCreateOrUpdateDialog = false;

  get pagination() {
    return {
      page: this.localState.page,
      itemsPerPage: this.localState.itemsPerPage,
      pageCount: this.localState.pageCount,
    }
  }

  get showPagination(): boolean {
    return this.pagination.pageCount > 1;
  }

  async search(): Promise<void> {
    await this.listSetupController.loadSetupList(this.searchTerm, 1);
  }

  closeDeleteDialog() {
    this.itemToDelete = null;
    this.showDeleteDialog = false;
  }

  closeCreateOrUpdateDialog() {
    this.itemToUpdate = null;
    this.showCreateOrUpdateDialog = false;
  }

  deleteItem(item: SetupEntity) {
    this.itemToDelete = item;
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingListSetupState';
  }

  get headers() {
    return [
      {
        text: 'NOME',
        align: 'start',
        sortable: false,
        value: 'nome',
        width: '76%',
      },
      {
        text: 'ATIVO',
        value: 'ativo',
        sortable: false,
        width: '10%',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        align: 'right',
        width: '14%',
      },
    ];
  }

  private async changePage(page: number): Promise<void> {
    await this.listSetupController.goToPage(page);
  }

  private async toggleAtivo(item: SetupEntity, value: boolean) {
    await this.listSetupController.changeAtivo(item.id, value);
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
    this.listSetupController.subscribe(this.updateState);
    this.listSetupController.resetState();
  }

  private updateState(newState: ListSetupState) {
    this.$nextTick(() => {
      this.localState = newState;
    });
  }

  public mounted() {
    this.listSetupController.loadSetupList();
  }

  private beforeDestroy() {
    this.listSetupController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
