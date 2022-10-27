import { Controller } from "@/core/common/domain/controller";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";
import {
  initialListTradeState,
  LoadedListTradeState,
  ListTradeState, ListTradeFilter
} from "@/core/trade/presentation/states/list-trade.state";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";

export class ListTradeController extends Controller<ListTradeState> {
  constructor(
    private listTradeUseCase: ListTradeUseCaseContract,
  ) {
    super(initialListTradeState);
  }

  public resetState() {
    this.changeState(initialListTradeState);
  }

  public setFilterFormAsList(filterAsList: FilterFormComplete[]): void {
    this.changeState({ filterAsList });
  }

  public loadTradeList(filter: ListTradeFilter, page?: number) {
    this.changeState({ kind: "LoadingListTradeState", filter });
    this.listTradeUseCase
      .execute({
        ...filter,
        page,
        itemsPerPage: this.state.itemsPerPage,
      })
      .then((result) => {
        if (result.successful) {
          this.changeState(this.mapToUpdatedState(result.value));
          return;
        }
        this.changeState({
          kind: "ErrorListTradeState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListTradeState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListTradeUseCaseContract.Response): ListTradeState {
    return {
      ...this.state,
      kind: "LoadedListTradeState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
      metadata: response.metadata,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadTradeList(this.state.filter, page);
  }

  public static mapFilterObjectToFilterList(filterObject: FilterFormObject): FilterFormComplete[] {
    return Object.keys(filterObject)
      .filter((field) => {
        const filterFormValue = filterObject[field];
        return (Array.isArray(filterFormValue) && filterFormValue.length) || !!filterFormValue;
      })
      .reduce<FilterFormComplete[]>((filterList, field) => {
        const filterFormValue = filterObject[field];

        if (Array.isArray(filterFormValue)) {
          filterList.concat(filterFormValue.map((value) => ({ field, ...value })));
          return filterList;
        }
        filterList.push({ field, ...filterFormValue });
        return filterList;
      }, []);
  }
}

export type FilterFormValue = {
  text: string;
  value: any;
}

export type FilterFormObject = Record<string, FilterFormValue | FilterFormValue[]>;

export type FilterFormComplete = FilterFormValue & { field: string };
