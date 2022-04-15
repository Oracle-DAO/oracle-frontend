import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { MimTokenContract, ORFITokenContract, sORFITokenContract } from "../../abi";
import { setAll } from "../../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        sORFI: string;
        ORFI: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const sOracleContract = new ethers.Contract(addresses.sORFI_ADDRESS, sORFITokenContract, provider);
    const sOracleBalance = await sOracleContract.balanceOf(address);
    const oracleContract = new ethers.Contract(addresses.ORFI_ADDRESS, ORFITokenContract, provider);
    const orcaleBalance = await oracleContract.balanceOf(address);

    return {
        balances: {
            sORFI: ethers.utils.formatUnits(sOracleBalance, "ether"),
            ORFI: ethers.utils.formatUnits(orcaleBalance, "ether"),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        ORFI: string;
        sORFI: string;
    };
    staking: {
        ORFI: number;
        sORFI: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let oracleBalance = 0;
    let sOracleBalance = 0;

    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.ORFI_ADDRESS) {
        const oracleContract = new ethers.Contract(addresses.ORFI_ADDRESS, ORFITokenContract, provider);
        oracleBalance = await oracleContract.balanceOf(address);
        stakeAllowance = await oracleContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    if (addresses.sORFI_ADDRESS) {
        const sOracleContract = new ethers.Contract(addresses.sORFI_ADDRESS, sORFITokenContract, provider);
        sOracleBalance = await sOracleContract.balanceOf(address);
        unstakeAllowance = await sOracleContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    return {
        balances: {
            sORFI: ethers.utils.formatUnits(sOracleBalance, "ether"),
            ORFI: ethers.utils.formatUnits(oracleBalance, "ether"),
        },
        staking: {
            ORFI: Number(stakeAllowance),
            sORFI: Number(unstakeAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    avaxBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                avaxBalance: 0,
            });
        });
    }

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 18);
    bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "ether");

    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        avaxBalance: Number(avaxVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal),
    };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isAvax?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }

    const addresses = getAddresses(networkID);
    const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    let balance = "0";
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);
    return {
        token: token.name,
        address: token.address,
        img: token.img,
        balance: Number(balanceVal),
    };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        sORFI: string;
        ORFI: string;
    };
    loading: boolean;
    staking: {
        ORFI: number;
        sORFI: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { sORFI: "", ORFI: "" },
    staking: { ORFI: 0, sORFI: 0 },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
        // .addCase(calculateUserTokenDetails.pending, (state, action) => {
        //     state.loading = true;
        // })
        // .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
        //     if (!action.payload) return;
        //     const token = action.payload.token;
        //     state.tokens[token] = action.payload;
        //     state.loading = false;
        // })
        // .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
        //     state.loading = false;
        //     console.log(error);
        // });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
