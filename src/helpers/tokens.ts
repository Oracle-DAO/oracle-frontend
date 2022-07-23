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
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    img: USDTIcon,
    decimals: 6,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0x333C0D279c6251a1A86c168b9B3ffDcf9B3AB68a",
    img: ORFIIcon,
    decimals: 18,
};

export default [usdt, ORFI];
