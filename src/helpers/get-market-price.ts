import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    // const mimTimeAddress = mimOrcl.getAddressForReserve(networkID);
    // const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);
    // const reserves = await pairContract.getReserves();
    // return reserves[0] / reserves[1];
    return 10;
}
