<template>
  <v-container class="pa-8">

    <v-form @submit.prevent="search" :disabled="isLoading">
      <v-row>
        <v-col cols="8" sm="6">
          <v-text-field
              v-model="searchTerm"
              outlined
              dense
              placeholder="ex: exportacao-2022-09-01.csv"
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
      </v-row>
    </v-form>

    <v-data-table
        :headers="headers"
        :items="localState.items"
        class="elevation-1 mt-8"
        hide-default-footer
        :loading="isLoading"
        loading-text="Buscando importações..."
        no-data-text="Nenhum importação encontrado"
    >

      <template v-slot:top>
        <delete-importacao
            :item="itemToDelete"
            :show="showDeleteDialog"
            @close="closeDeleteDialog"
        ></delete-importacao>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
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
import { ListImportacaoController } from "@/core/importacao/presentation/controllers/list-importacao.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { ListImportacaoState } from "@/core/importacao/presentation/states/list-importacao.state";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";
import DeleteImportacao from "@/views/configuracoes/importacoes/components/delete-importacao.vue";

@Component({
  components: { DeleteImportacao },
})
export default class ListImportacao extends Vue {
  private listImportacaoController: ListImportacaoController = app.make<ListImportacaoController>(TYPES.ListImportacaoController);
  private localState: ListImportacaoState = this.listImportacaoController.state;

  searchTerm = '';
  itemToDelete?: ImportacaoEntity | null = null;
  showDeleteDialog = false;

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
    await this.listImportacaoController.loadImportacaoList(this.searchTerm, 1);
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.itemToDelete = null;
  }

  deleteItem(item: ImportacaoEntity) {
    this.itemToDelete = item;
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingListImportacaoState';
  }

  get headers() {
    return [
      {
        text: 'DATA - HORA',
        align: 'center',
        sortable: false,
        value: 'createdAtFormatted',
        width: '10%',
      },
      {
        text: 'NOME DO ARQUIVO',
        align: 'start',
        sortable: false,
        value: 'arquivoNome',
        width: '60%',
      },
      {
        text: 'OPERAÇÕES',
        align: 'center',
        sortable: false,
        value: 'tradeCount',
        width: '15%',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        align: 'right',
        width: '15%',
      },
    ];
  }

  private async changePage(page: number): Promise<void> {
    await this.listImportacaoController.goToPage(page);
  }

  private created() {
    this.listImportacaoController.subscribe(this.updateState);
    this.listImportacaoController.resetState();
  }

  private updateState(newState: ListImportacaoState) {
    this.$nextTick(() => {
      this.localState = newState;
    });
  }

  public mounted() {
    this.listImportacaoController.loadImportacaoList();
  }

  private beforeDestroy() {
    this.listImportacaoController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
