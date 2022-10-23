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
        loading-text="Buscando usuários..."
        no-data-text="Nenhum usuário encontrado"
    >

      <template v-slot:top>
        <delete-user
            :item="itemToDelete"
            :show="showDeleteDialog"
            @close="closeDeleteDialog"
        ></delete-user>
        <create-or-update-user
            :item="itemToUpdate"
            :show="showCreateOrUpdateDialog"
            @close="closeCreateOrUpdateDialog"
        ></create-or-update-user>
      </template>

      <template v-slot:[`item.active`]="{ item }">
        <v-switch
            small
            class="mr-2"
            :input-value="item.active"
            dense
            @change="() => toggleActive(item, !item.active)"
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
import { ListUserController } from "@/core/user/presentation/controllers/list-user.controller";
import { TYPES } from "@/core/common/providers/types";
import { Component, Vue } from "vue-property-decorator";
import { ListUserState } from "@/core/user/presentation/states/list-user.state";
import { UserEntity } from "@/core/user/domain/entities/user.entity";
import DeleteUser from "@/views/admin/users/components/delete-user.vue";
import CreateOrUpdateUser from "@/views/admin/users/components/create-or-update-user.vue";

@Component({
  components: { CreateOrUpdateUser, DeleteUser },
})
export default class ListUser extends Vue {
  private listUserController: ListUserController = app.make<ListUserController>(TYPES.ListUserController);
  private localState: ListUserState = this.listUserController.state;

  searchTerm = '';

  itemToUpdate?: UserEntity = null;
  itemToDelete?: UserEntity = null;

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
    await this.listUserController.loadUserList(this.searchTerm, 1);
  }

  closeDeleteDialog() {
    this.itemToDelete = undefined;
    this.showDeleteDialog = false;
  }

  closeCreateOrUpdateDialog() {
    this.itemToUpdate = undefined;
    this.showCreateOrUpdateDialog = false;
  }

  deleteItem(item: UserEntity) {
    this.itemToDelete = item;
    this.showDeleteDialog = true;
  }

  get isLoading(): boolean {
    return this.localState.kind === 'LoadingListUserState';
  }

  get headers() {
    return [
      {
        text: 'NOME',
        align: 'start',
        sortable: false,
        value: 'name',
        width: '16%',
      },
      {
        text: 'SOBRENOME',
        align: 'start',
        sortable: false,
        value: 'lastnome',
        width: '20%',
      },
      {
        text: 'EMAIL',
        align: 'start',
        sortable: false,
        value: 'email',
        width: '40%',
      },
      {
        text: 'ATIVO',
        value: 'active',
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
    await this.listUserController.goToPage(page);
  }

  private async toggleActive(item: UserEntity, value: boolean) {
    await this.listUserController.changeActive(item.id, value);
  }

  private createItem() {
    this.itemToUpdate = undefined;
    this.showCreateOrUpdateDialog = true;
  }

  private updateItem(item: UserEntity) {
    this.itemToUpdate = item;
    this.showCreateOrUpdateDialog = true;
  }

  private created() {
    this.listUserController.subscribe(this.updateState);
    this.listUserController.resetState();
  }

  private updateState(newState: ListUserState) {
    this.$nextTick(() => {
      this.localState = newState;
    });
  }

  public mounted() {
    this.listUserController.loadUserList();
  }

  private beforeDestroy() {
    this.listUserController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>