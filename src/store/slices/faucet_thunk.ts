import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses, Networks } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { success, warning } from "./messages-slice";
import { messages } from "../../constants/messages";
import { ethers } from "ethers";
import { FaucetContract } from "../../abi";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";

interface IChangeApproval {
    token: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const getTokens = createAsyncThunk("faucet/getMiM", async ({ token, provider, address, networkID }: IChangeApproval, { dispatch }) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const tokenName = token + "_FAUCET";
    const mimFaucet = new ethers.Contract(addresses[tokenName], FaucetContract, signer);

    try {
        const gasPrice = await getGasPrice(provider);
        let approveTx = await mimFaucet.faucet(address, { gasPrice });
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    }
    await sleep(2);
});
