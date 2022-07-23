import { Networks } from "../../constants/blockchain";
import { StableBond } from "./stable-bond";

import USDTIcon from "../../assets/tokens/USDT.svg";

import { StableBondContract, StableReserveContract } from "../../abi";

export const usdt = new StableBond({
    name: "usdt",
    displayName: "USDT",
    bondToken: "USDT",
    bondIconSvg: USDTIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.OASIS]: {
            bondAddress: "0x91c480c995FD11f3795C52aC38272563d55B792D",
            reserveAddress: "0xdC19A122e268128B5eE20366299fc7b5b199C8e3",
        },
    },
    tokensInStrategy: "",
});

export default [usdt];
