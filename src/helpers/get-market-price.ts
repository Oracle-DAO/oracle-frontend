import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const lpAddress = "0x2Fd795f46D69e4B1d756F16EE76Abf0835EB213C";
    const pairContract = new ethers.Contract(lpAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    return (reserves[1] * Math.pow(10, 12)) / reserves[0];
}
