import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ORFITokenContract, sORFITokenContract, StakingContract, TavContract } from "../../abi";
import { getMarketPrice, getTokenPrice, setAll } from "../../helpers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RootState } from "../store";
import allBonds from "../../helpers/bond";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const mimPrice = getTokenPrice("MIM");
        const addresses = getAddresses(networkID);

        const stakingContract = new ethers.Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
        const currentBlock = await provider.getBlockNumber();
        const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        const sOracleContract = new ethers.Contract(addresses.sORFI_ADDRESS, sORFITokenContract, provider);
        const oracleContract = new ethers.Contract(addresses.ORFI_ADDRESS, ORFITokenContract, provider);
        const tavContract = new ethers.Contract(addresses.TAV_CALCULATOR_ADDRESS, TavContract, provider);

        // TODO revisit
        // const marketPrice = ((await getMarketPrice(networkID, provider)) / Math.pow(10, 18)) * mimPrice;
        const marketPrice = (await getMarketPrice(networkID, provider)) * mimPrice;

        const totalSupply = (await oracleContract.totalSupply()) / Math.pow(10, 18);
        const circSupply = (await sOracleContract.totalSupply()) / Math.pow(10, 18);
        const stakingTVL = circSupply * marketPrice;
        const marketCap = totalSupply * marketPrice;

        const tav = (await tavContract.calculateTAV()) / Math.pow(10, 9);
        const tokenBalPromises = allBonds.map(bond => bond.getTreasuryBalance(networkID, provider));
        const tokenBalances = await Promise.all(tokenBalPromises);
        const treasuryBalance = tokenBalances.reduce((tokenBalance0, tokenBalance1) => tokenBalance0 + tokenBalance1, 0);

        const tokenAmountsPromises = allBonds.map(bond => bond.getTokenAmount(networkID, provider));
        const tokenAmounts = await Promise.all(tokenAmountsPromises);
        const rfvTreasury = tokenAmounts.reduce((tokenAmount0, tokenAmount1) => tokenAmount0 + tokenAmount1, 0);

        const ORFIBondsAmountsPromises = allBonds.map(bond => bond.getoracleAmount(networkID, provider));
        const ORFIBondsAmounts = await Promise.all(ORFIBondsAmountsPromises);
        const oracleAmount = ORFIBondsAmounts.reduce((oracleAmount0, oracleAmount1) => oracleAmount0 + oracleAmount1, 0);
        const ORFISupply = totalSupply - oracleAmount;

        const rfv = rfvTreasury / ORFISupply;

        const treasuryRunway = rfvTreasury / circSupply;

        return {
            stakingTVL,
            marketPrice,
            marketCap,
            circSupply,
            currentBlock,
            currentBlockTime,
            treasuryBalance,
            totalSupply,
            rfv,
            tav,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    stakingTVL: number;
    marketPrice: number;
    marketCap: number;
    circSupply: number;
    currentBlock: number;
    currentBlockTime: number;
    treasuryBalance: number;
    networkID: number;
    totalSupply: number;
    rfv: number;
    tav: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
