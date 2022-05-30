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
    address: "0x09DC92B84BC354AAcc23fC5498Ba9ca17E495a8F",
    img: USDTIcon,
    decimals: 6,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0x7fb1154E008c08C17818C69Db826202ED2228a8d",
    img: ORFIIcon,
    decimals: 18,
};

export default [usdt, ORFI];
