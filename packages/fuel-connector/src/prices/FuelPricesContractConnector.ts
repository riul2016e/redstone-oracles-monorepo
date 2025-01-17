import { IPricesContractAdapter } from "@redstone-finance/sdk";
import { Contract, WalletLocked, WalletUnlocked } from "fuels";
import { FuelContractConnector } from "../FuelContractConnector";
import { PricesAbi, PricesAbi__factory } from "../autogenerated";
import { FuelPricesContractAdapter } from "./FuelPricesContractAdapter";

export type FuelPricesContract = PricesAbi & Contract;

export class FuelPricesContractConnector extends FuelContractConnector<IPricesContractAdapter> {
  constructor(
    wallet: WalletLocked | WalletUnlocked | undefined,
    private contractId: string
  ) {
    super(wallet);
  }

  getContract(): FuelPricesContract {
    return PricesAbi__factory.connect(this.contractId, this.wallet!);
  }

  getAdapter(): Promise<IPricesContractAdapter> {
    return Promise.resolve(
      new FuelPricesContractAdapter(this.getContract(), this.getGasLimit())
    );
  }
}
