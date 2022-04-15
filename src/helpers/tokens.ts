import MimIcon from "../assets/tokens/MIM.svg";
import ORFIIcon from "../assets/tokens/ORFI.png";

export interface IToken {
    name: string;
    address: string;
    img: string;
    isAvax?: boolean;
    decimals: number;
}

export const mim: IToken = {
    name: "MIM",
    address: "0xe3d9f491D84Fb39D0ACA6dB49ed02758Ed40AEcF",
    img: MimIcon,
    decimals: 18,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0x7E76335aCe23bBA458e15f05CA6fdC68dcFc4D12",
    img: ORFIIcon,
    decimals: 18,
};

export default [mim, ORFI];
