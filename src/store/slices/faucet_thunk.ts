import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses, Networks } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { success } from "./messages-slice";
import { messages } from "../../constants/messages";
import { ethers } from "ethers";
import { FaucetContract } from "../../abi";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";

interface IChangeApproval {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const getUSDTTokens = createAsyncThunk("faucet/getUSDT", async ({ provider, address, networkID }: IChangeApproval, { dispatch }) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const usdtFaucet = new ethers.Contract(addresses.USDT_FAUCET, FaucetContract, signer);

    try {
        const gasPrice = await getGasPrice(provider);
        let approveTx = await usdtFaucet.faucet(address, { gasPrice });
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    }
    await sleep(2);
});

export const getORFITokens = createAsyncThunk("faucet/getORFI", async ({ provider, address, networkID }: IChangeApproval, { dispatch }) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const orfiFaucet = new ethers.Contract(addresses.ORFI_FAUCET, FaucetContract, signer);

    try {
        const gasPrice = await getGasPrice(provider);
        let approveTx = await orfiFaucet.faucet(address, { gasPrice });
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    }
    await sleep(2);
});
