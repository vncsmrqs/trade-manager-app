import { Controller } from "@/core/common/domain/controller";
import { ListImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/list-importacao.use-case";
import {
  initialListImportacaoState,
  LoadedListImportacaoState,
  ListImportacaoState
} from "@/core/importacao/presentation/states/list-importacao.state";

export class ListImportacaoController extends Controller<ListImportacaoState> {
  constructor(
    private getImportacaoListUseCase: ListImportacaoUseCaseContract,
  ) {
    super(initialListImportacaoState);
  }

  public resetState() {
    this.changeState(initialListImportacaoState);
  }

  public loadImportacaoList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListImportacaoState",
      search,
    });
    this.getImportacaoListUseCase
      .execute({
        itemsPerPage: this.state.itemsPerPage,
        search,
        page,
      })
      .then((result) => {
        if (result.successful) {
          this.changeState(this.mapToUpdatedState(result.value));
          return;
        }
        this.changeState({
          kind: "ErrorListImportacaoState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListImportacaoState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListImportacaoUseCaseContract.Response): ListImportacaoState {
    return {
      ...this.state,
      kind: "LoadedListImportacaoState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadImportacaoList(this.state.search, page);
  }
}
