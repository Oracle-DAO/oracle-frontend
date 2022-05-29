import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond } from "./stable-bond";

import USDTIcon from "../../assets/tokens/USDT.svg";

import { LpBondContract, LpReserveContract, StableBondContract, StableReserveContract } from "../../abi";

export const usdt = new StableBond({
    name: "usdt",
    displayName: "USDT",
    bondToken: "USDT",
    bondIconSvg: USDTIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.POLYGON]: {
            // TODO change
            bondAddress: "0xf203b559c1C18F49d041D25bf448C68aFA021ca3",
            reserveAddress: "0xe3d9f491D84Fb39D0ACA6dB49ed02758Ed40AEcF",
        },
    },
    tokensInStrategy: "",
});

export const usdtORFI = new LPBond({
    name: "usdt_ORFI_lp",
    displayName: "ORFI-USDT LP",
    bondToken: "USDT",
    bondIconSvg: USDTIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.POLYGON]: {
            bondAddress: "0xb90D4514e2cDBd6435966676e7Eb3188Cd99099b",
            reserveAddress: "0x4b6b46c01dC2e7C5c4f7c01adDB586f93e1aa498",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

// export const avaxTime = new CustomLPBond({
//     name: "avax_time_lp",
//     displayName: "ORFI-AVAX LP",
//     bondToken: "AVAX",
//     bondIconSvg: AvaxTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.STARDUST]: {
//             bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
//             reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

export default [usdt];
