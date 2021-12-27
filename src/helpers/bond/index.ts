import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";

import { StableBondContract, LpBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const mim = new StableBond({
    name: "mim",
    displayName: "MIM",
    bondToken: "MIM",
    bondIconSvg: MimIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.STARDUST]: {
            bondAddress: "0xCEF466b27Ea42D5F89165fEc4C72Fb87e1Aea5e3",
            reserveAddress: "0xF9B0f27d6b3CAF7a47B7BF414cc3aD7530c87Cff",
        },
    },
    tokensInStrategy: "",
});

// TODO change this
// export const wMetis = new CustomBond({
//     name: "wMMetis",
//     displayName: "wMetis",
//     bondToken: "wMETIS",
//     bondIconSvg: AvaxIcon,
//     bondContractABI: WavaxBondContract,
//     reserveContractAbi: StableReserveContract,
//     networkAddrs: {
//         [Networks.STARDUST]: {
//             bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
//             reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
//         },
//     },
//     tokensInStrategy: "756916000000000000000000",
// });

// export const mimTime = new LPBond({
//     name: "mim_time_lp",
//     displayName: "ORCL-MIM LP",
//     bondToken: "MIM",
//     bondIconSvg: MimTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.STARDUST]: {
//             bondAddress: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
//             reserveAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

// export const avaxTime = new CustomLPBond({
//     name: "avax_time_lp",
//     displayName: "ORCL-AVAX LP",
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
