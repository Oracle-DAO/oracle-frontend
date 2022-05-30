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
            bondAddress: "0xb74C6537d732B268944F3a43583da24986918434",
            reserveAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
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
            bondAddress: "0xe73B287BC12f94863cD09b19884892F66C81FA82",
            reserveAddress: "0xE97df29FdA38A57747b17747Be2b93418605f9F6",
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
