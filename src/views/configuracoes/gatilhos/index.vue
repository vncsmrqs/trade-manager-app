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
        loading-text="Buscando gatilhos..."
        no-data-text="Nenhum gatilho encontrado"
    >

      <template v-slot:top>
        <delete-gatilho
            :item="itemToDelete"
            :show="showDeleteDialog"
            @close="closeDeleteDialog"
        ></delete-gatilho>
        <create-or-update-gatilho
            :item="itemToUpdate"
            :show="showCreateOrUpdateDialog"
            @close="closeCreateOrUpdateDialog"
        ></create-or-update-gatilho>
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
import { ListGatilhoController } from "@/core/gatilho/presentation/controllers/list-gatilho.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { ListGatilhoState } from "@/core/gatilho/presentation/states/list-gatilho.state";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import DeleteGatilho from "@/views/configuracoes/gatilhos/components/delete-gatilho.vue";
import CreateOrUpdateGatilho from "@/views/configuracoes/gatilhos/components/create-or-update-gatilho.vue";

@Component({
  components: { CreateOrUpdateGatilho, DeleteGatilho },
})
export default class ListGatilho extends Vue {
  private listGatilhoController: ListGatilhoController = app.make<ListGatilhoController>(TYPES.ListGatilhoController);
  private localState: ListGatilhoState = this.listGatilhoController.state;

  searchTerm = '';

  itemToUpdate?: GatilhoEntity = null;
  itemToDelete?: GatilhoEntity = null;

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
    return this.pagination.pageCount > 1;
  }

  async search(): Promise<void> {
    await this.listGatilhoController.loadGatilhoList(this.searchTerm, 1);
  }

  closeDeleteDialog() {
    this.itemToDelete = undefined;
    this.showDeleteDialog = false;
  }

  closeCreateOrUpdateDialog() {
    this.itemToUpdate = undefined;
    this.showCreateOrUpdateDialog = false;
  }

  deleteItem(item: GatilhoEntity) {
    this.itemToDelete = item;
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingListGatilhoState';
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
    await this.listGatilhoController.goToPage(page);
  }

  private async toggleAtivo(item: GatilhoEntity, value: boolean) {
    await this.listGatilhoController.changeAtivo(item.id, value);
  }

  private createItem() {
    this.itemToUpdate = undefined;
    this.showCreateOrUpdateDialog = true;
  }

  private updateItem(item: GatilhoEntity) {
    this.itemToUpdate = item;
    this.showCreateOrUpdateDialog = true;
  }

  private created() {
    this.listGatilhoController.subscribe(this.updateState);
    this.listGatilhoController.resetState();
  }

  private updateState(newState: ListGatilhoState) {
    this.$nextTick(() => {
      this.localState = newState;
    });
  }

  public mounted() {
    this.listGatilhoController.loadGatilhoList();
  }

  private beforeDestroy() {
    this.listGatilhoController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
