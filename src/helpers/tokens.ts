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
    address: "0xc737B9014ba9656120aA02C3c4DAC25BcCAc055F",
    img: USDTIcon,
    decimals: 6,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0xF65d85a91B3576E637B7B52908dA6A5267287129",
    img: ORFIIcon,
    decimals: 18,
};

export default [usdt, ORFI];
