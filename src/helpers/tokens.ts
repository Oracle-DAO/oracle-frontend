import AvaxIcon from "../assets/tokens/AVAX.svg";
import MimIcon from "../assets/tokens/MIM.svg";
import ORFIIcon from "../assets/tokens/ORFI.png";
import WavaxIcon from "../assets/tokens/WAVAX.png";
import WethEIcon from "../assets/tokens/WETH.e.png";

export interface IToken {
    name: string;
    address: string;
    img: string;
    isAvax?: boolean;
    decimals: number;
}

export const metis: IToken = {
    name: "METIS",
    isAvax: true,
    img: AvaxIcon,
    address: "",
    decimals: 18,
};

export const mim: IToken = {
    name: "MIM",
    address: "0xe5A9FafD83C4081f7b91312A779d335C285b3f80",
    img: MimIcon,
    decimals: 18,
};

export const ORFI: IToken = {
    name: "ORFI",
    address: "0x5947d62B59e3269D664EB08831d73541B1cdDe4C",
    img: ORFIIcon,
    decimals: 9,
};

export const wavax: IToken = {
    name: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    img: WavaxIcon,
    decimals: 18,
};

export default [metis, mim, ORFI];
