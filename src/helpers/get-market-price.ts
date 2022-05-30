import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const lpAddress = "0x74D8E539b3A2Bcbbf265daade16A7B97193e29ff";
    const pairContract = new ethers.Contract(lpAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    return (reserves[1] * Math.pow(10, 12)) / reserves[0];
}
