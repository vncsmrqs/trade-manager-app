import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumUseCaseContract,
  ResultadoTradeValue
} from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";

export class GetTradeSumUseCase implements GetTradeSumUseCaseContract{
  execute(
    params: GetTradeSumUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumResult })), 3000);
    });
  }
}

const tradeSumResult: ResultadoTradeValue[] = [
  {
    name: 'loss',
    value: 10,
  },
  {
    name: 'gain',
    value: 20,
  },
  {
    name: '0x0',
    value: 30,
  },
];
