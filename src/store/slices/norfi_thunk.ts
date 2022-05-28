import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses, Networks } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { success } from "./messages-slice";
import { messages } from "../../constants/messages";
import { ethers } from "ethers";
import { NORFI } from "../../abi";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";

interface IReward {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    amount: string;
    address: string;
    networkID: Networks;
}

export const redeemNORFI = createAsyncThunk("norfi/redeemNorfi", async ({ provider, amount, address, networkID }: IReward, { dispatch }) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const redeemNORFI = new ethers.Contract(addresses.NORFI, NORFI, signer);

    let redeem;
    try {
        const gasPrice = await getGasPrice(provider);
        const amountInWei = ethers.utils.parseEther(amount);
        redeem = await redeemNORFI.redeemORFI(amountInWei, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: redeem.hash, text: "Redeem NORFI", type: "redeemNORFI" }));
        await redeem.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (redeem) {
            dispatch(clearPendingTxn(redeem.hash));
        }
    }
    await sleep(2);
});
