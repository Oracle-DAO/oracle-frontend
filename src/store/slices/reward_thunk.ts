import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses, Networks } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { success } from "./messages-slice";
import { messages } from "../../constants/messages";
import { ethers } from "ethers";
import { RewardCalculator } from "../../abi";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";

interface IReward {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const collectRewards = createAsyncThunk("reward/collectRewards", async ({ provider, address, networkID }: IReward, { dispatch }) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const rewardCalculator = new ethers.Contract(addresses.REWARD_CALCULATOR, RewardCalculator, signer);

    let rewardTxn;
    try {
        const gasPrice = await getGasPrice(provider);
        rewardTxn = await rewardCalculator.redeemTotalRewardsForUser(address, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: rewardTxn.hash, text: "CollectRewards", type: "getRewards" }));
        await rewardTxn.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (rewardTxn) {
            dispatch(clearPendingTxn(rewardTxn.hash));
        }
    }
    await sleep(2);
});
