import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";

import { LpBondContract, LpReserveContract, StableBondContract, StableReserveContract } from "../../abi";

export const mim = new StableBond({
    name: "mim",
    displayName: "MIM",
    bondToken: "MIM",
    bondIconSvg: MimIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.OASIS]: {
            bondAddress: "0xbB75D2F3283A473ebc9F457B3c0487078F1223e9",
            reserveAddress: "0x4645ea401a4E500526E80361346e7a7D9e4D946e",
        },
    },
    tokensInStrategy: "",
});

export const mimORFI = new LPBond({
    name: "mim_ORFI_lp",
    displayName: "ORFI-MIM LP",
    bondToken: "MIM",
    bondIconSvg: MimIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.OASIS]: {
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

export default [mim];
