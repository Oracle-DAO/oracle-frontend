import { Networks } from "./blockchain";

const OASIS = {
    DAO_ADDRESS: "0x25Ba98A0Acfa19160E52aa123b7C612A1fc5db90",
    sORFI_ADDRESS: "0xe2256E6db537fa3622628724b02ff4191089eEaB",
    ORFI_ADDRESS: "0x7E76335aCe23bBA458e15f05CA6fdC68dcFc4D12",
    MIM_ADDRESS: "0xe3d9f491D84Fb39D0ACA6dB49ed02758Ed40AEcF",
    STAKING_ADDRESS: "0x98758C499dAeC2B2b506b0e76023bc9A8687ec55",
    TREASURY_ADDRESS: "0x558F7cA3f87BE6348F059cEe8b45E09097DcFc48",
    TAV_CALCULATOR_ADDRESS: "0xe6F1Fd214ca6cC1F0912CD7Dbc37Fff9D3eB7493",
    REWARD_CALCULATOR: "0x077f1572876e9405172d82eEB0BF6f6AdaC4CFae",
    ORFI_BONDING_CALC_ADDRESS: "0x47B7648B548c29a17c2266971A020A2A973c810d",
    ZAPIN_ADDRESS: "0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae", //"0xb98007C04f475022bE681a890512518052CE6104",
    MIM_FAUCET: "0x8a5045040BB7b1a2d98a0cabFdfbfFfF2E692220",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.OASIS) {
        return OASIS;
    }

    throw Error("Network don't support");
};
