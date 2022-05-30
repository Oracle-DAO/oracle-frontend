import { Networks } from "./blockchain";

const POLYGON = {
    DAO_ADDRESS: "0xDB4ED07Ce11cf4f4F04622627dF29E605541F994",
    sORFI_ADDRESS: "0x3D19dD4C00989232E44637463b7DC76b9e3F3917",
    ORFI_ADDRESS: "0x333C0D279c6251a1A86c168b9B3ffDcf9B3AB68a",
    USDT_ADDRESS: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    STAKING_ADDRESS: "0x8163713361c0cbA9c3D51d0dd4BfB6F1497200e4",
    TREASURY_ADDRESS: "0xf039394673E0C5F2D211254da1F6207854Fec0A1",
    TAV_CALCULATOR_ADDRESS: "0x16857596bd5E1bf9cbBA04dA62594a3fa6eFE2F8",
    REWARD_CALCULATOR: "0x8E97A15f9c7913622DE0BBCC64Caba8b02edDc7c",
    ORFI_BONDING_CALC_ADDRESS: "",
    NORFI: "0x57e54A873382F9758f1F6dE9790f50c1F50c67C9",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.POLYGON) {
        return POLYGON;
    }

    throw Error("Network don't support");
};
