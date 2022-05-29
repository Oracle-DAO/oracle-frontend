import ORFIIcon from "../assets/tokens/ORFI.png";
import USDTIcon from "../assets/tokens/USDT.svg";

export interface IToken {
    name: string;
    address: string;
    img: string;
    isAvax?: boolean;
    decimals: number;
}

export const usdt: IToken = {
    name: "USDT",
    // TODO update here
    address: "0xe3d9f491D84Fb39D0ACA6dB49ed02758Ed40AEcF",
    img: USDTIcon,
    decimals: 6,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0x7E76335aCe23bBA458e15f05CA6fdC68dcFc4D12",
    img: ORFIIcon,
    decimals: 18,
};

export default [usdt, ORFI];
