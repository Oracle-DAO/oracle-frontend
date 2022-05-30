import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const lpAddress = "0xFD3F0Aa6E4F88CCFF7b35B9Dc81c61E2aC28Bd5a";
    const pairContract = new ethers.Contract(lpAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    return (reserves[0] * Math.pow(10, 12)) / reserves[1];
}
