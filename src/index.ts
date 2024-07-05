import axios from "axios";
import { address } from "./types/adress";
import { balanceRequest } from "./types/balanceRequest";
import { FullAddressInfo } from "./types/addressInfo";

interface cryptos {}

export class blockcypher {
  static async generateWallet(crypto: cryptos): Promise<address> {
    const response: address = (
      await axios.post(`https://api.blockcypher.com/v1/${crypto}/addrs`)
    ).data;
    return response;
  }

  static async getBalance(
    crypto: cryptos,
    address: string
  ): Promise<balanceRequest> {
    const response: balanceRequest = (
      await axios.get(
        `https://api.blockcypher.com/v1/${crypto}/addrs/${address}/balance`
      )
    ).data;
    return response;
  }

  static async getFullAddressInfo(crypto: cryptos, address: string): Promise<FullAddressInfo> {
    const response: FullAddressInfo = (
      await axios.get(
        `https://api.blockcypher.com/v1/${crypto}/addrs/${address}/full`
      )
    ).data;
    return response;
  }
}

async function test() {
  const generated = await blockcypher.generateWallet("btc/main");
  const data = await blockcypher.getFullAddressInfo("btc/main", generated.address)
  console.log(generated, data);
}

test();
