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
        loading-text="Buscando tipos de entradas..."
        no-data-text="Nenhum tipo de entrada encontrado"
    >

      <template v-slot:top>
        <delete-tipo-entrada
            :item="itemToDelete"
            :show="showDeleteDialog"
            @close="closeDeleteDialog"
        ></delete-tipo-entrada>
        <create-or-update-tipo-entrada
            :item="itemToUpdate"
            :show="showCreateOrUpdateDialog"
            @close="closeCreateOrUpdateDialog"
        ></create-or-update-tipo-entrada>
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
import { ListTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/list-tipo-entrada.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { ListTipoEntradaState } from "@/core/tipo-entrada/presentation/states/list-tipo-entrada.state";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import DeleteTipoEntrada from "@/views/configuracoes/tipos-entradas/components/delete-tipo-entrada.vue";
import CreateOrUpdateTipoEntrada from "@/views/configuracoes/tipos-entradas/components/create-or-update-tipo-entrada.vue";

@Component({
  components: { CreateOrUpdateTipoEntrada, DeleteTipoEntrada },
})
export default class ListTipoEntrada extends Vue {
  private listTipoEntradaController: ListTipoEntradaController = app.make<ListTipoEntradaController>(TYPES.ListTipoEntradaController);
  private localState: ListTipoEntradaState = this.listTipoEntradaController.state;

  searchTerm = '';

  itemToUpdate?: TipoEntradaEntity = null;
  itemToDelete?: TipoEntradaEntity = null;

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
    await this.listTipoEntradaController.loadTipoEntradaList(this.searchTerm, 1);
  }

  closeDeleteDialog() {
    this.itemToDelete = null;
    this.showDeleteDialog = false;
  }

  closeCreateOrUpdateDialog() {
    this.itemToUpdate = null;
    this.showCreateOrUpdateDialog = false;
  }

  deleteItem(item: TipoEntradaEntity) {
    this.itemToDelete = item;
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingListTipoEntradaState';
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
    await this.listTipoEntradaController.goToPage(page);
  }

  private async toggleAtivo(item: TipoEntradaEntity, value: boolean) {
    await this.listTipoEntradaController.changeAtivo(item.id, value);
  }

  private createItem() {
    this.itemToUpdate = null;
    this.showCreateOrUpdateDialog = true;
  }

  private updateItem(item: TipoEntradaEntity) {
    this.itemToUpdate = item;
    this.showCreateOrUpdateDialog = true;
  }

  private created() {
    this.listTipoEntradaController.subscribe(this.updateState);
    this.listTipoEntradaController.resetState();
  }

  private updateState(newState: ListTipoEntradaState) {
    this.$nextTick(() => {
      this.localState = newState;
    });
  }

  public mounted() {
    this.listTipoEntradaController.loadTipoEntradaList();
  }

  private beforeDestroy() {
    this.listTipoEntradaController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
