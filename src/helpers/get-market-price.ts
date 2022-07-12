import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const lpAddress = "0x2E8F5530DAf29079c63Ae28C2cD5A3733af942BA";
    const pairContract = new ethers.Contract(lpAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    return (reserves[1] * Math.pow(10, 12)) / reserves[0];
}
