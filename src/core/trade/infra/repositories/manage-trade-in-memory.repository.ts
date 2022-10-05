import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { TradeEntity, TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { v4 as uuid } from "uuid";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { chunkArray } from "@/common/utils";

let tradeList: Record<any, any>[] = generateTrades();

function generateTrades(num = 500): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => {
    const par = i % 2 === 0;
    const multiploDeTres = i % 3 === 0;
    const pontuacao = multiploDeTres ? 0 : (i * 100 * (par ? 1 : -1));
    const geraResultado = (pontos: number): TradeResultadoType => {
      if (pontos > 0) return 'gain';
      if (pontos < 0) return 'loss';
      return '0x0'
    };
    return {
      id: uuid(),
      userId: uuid(),
      ativoId: uuid(),
      setupId : uuid(),
      gatilhoId : uuid(),
      tipoEntradaId : uuid(),
      tradeImportacaoId : uuid(),
      createdAt: '2022-01-01T00:00:00-03',
      updatedAt: '2022-01-01T00:00:00-03',
      dataAbertura: '2022-01-01T00:00:00-03',
      dataFechamento: '2022-01-01T00:00:00-03',
      lote: i + 1,
      pontuacao,
      resultado: geraResultado(pontuacao),
      seguiuPlano : par,
      sentimento : multiploDeTres ? 'neutro' : (par ? 'bem' : 'mal'),
      primeiroAlvo : par,
      segundoAlvo : !par,
      imagemUrl : 'https://poderdoinvestimento.com/wp-content/uploads/2020/09/MUDAN%C3%87AS-TENDENCIA-MEDIAS.png',
      userNome: 'User ' + (i + 1),
      ativoNome: 'Contrato Indice Cheio ' + (i + 1),
      ativoCode: 'WIN' + (i + 1),
      setupNome: 'Setup ' + (i + 1),
      gatilhoNome: 'Gatilho ' + (i + 1),
      tipoEntradaNome: 'Tipo Entrada ' + (i + 1),
      observacao: 'Observação ' + (i + 1),
    };
  });
}

export class ManageTradeInMemoryRepository implements
  ListTradeRepositoryContract,
  CreateTradeRepositoryContract,
  UpdateTradeRepositoryContract,
  DeleteTradeRepositoryContract
{
  list(
    params: ListTradeRepositoryContract.Params
  ): Promise<ActionResult<ListTradeRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const totalItems = tradeList.length;
      const itemsPerPage = (params.itemsPerPage || totalItems);
      const pageCount = Math.ceil(tradeList.length / itemsPerPage);
      const items = chunkArray<TradeEntity>(mapTradeListToEntity(tradeList), itemsPerPage);
      const page = params.page || 1;
      console.log({ params });
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount,
          metadata: {
            totalItems,
            lossCount: 45,
            gainCount: 45,
            lossPercentage: 45,
            gainPercentage: 45,
          }
        }));
      }, 3000);
    });
  }

  create(params: CreateTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tradeList.push(mapTradeToEntity(params));
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  update(params: UpdateTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tradeList = tradeList.map((trade) => {
        if (params.id === trade.id) {
          return {
            ...trade,
            ...params,
          };
        }
        return trade;
      });
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  delete(params: DeleteTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tradeList = tradeList.filter((trade) => trade.id !== params.id);
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }
}

const mapTradeToEntity = (trade: Record<string, any>): TradeEntity => {
  return new TradeEntity({
    id: trade.id || uuid(),
    userId: trade.userId,
    ativoId: trade.ativoId,
    setupId : trade.setupId,
    gatilhoId : trade.gatilhoId,
    tipoEntradaId : trade.tipoEntradaId,
    tradeImportacaoId : trade.tradeImportacaoId,
    timeFrameId: trade.timeFrameId,
    createdAt: trade.createdAt,
    updatedAt: trade.updatedAt,
    dataAbertura: trade.dataAbertura,
    dataFechamento: trade.dataFechamento,
    lote: trade.lote,
    pontuacao: trade.pontuacao,
    resultado: trade.resultado,
    seguiuPlano: trade.seguiuPlano,
    sentimento: trade.sentimento,
    primeiroAlvo: trade.primeiroAlvo,
    segundoAlvo: trade.segundoAlvo,
    imagemUrl: trade.imagemUrl,
    userNome: trade.userNome,
    ativoNome: trade.ativoNome,
    setupNome: trade.setupNome,
    gatilhoNome: trade.gatilhoNome,
    tipoEntradaNome: trade.tipoEntradaNome,
    ativoCode: trade.ativoCode,
    timeFrameNome: trade.timeFrameNome,
    observacao: trade.observacao,
  });
}

const mapTradeListToEntity = (tradeList: Record<string, any>[]): TradeEntity[] => {
  return tradeList.map(mapTradeToEntity);
}
