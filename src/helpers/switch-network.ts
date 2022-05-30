import { getMainnetURI } from "../hooks/web3/helpers";

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x24C" }],
    });
};

const addChainRequest = () => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0x24C",
                chainName: "Metis Stardust",
                rpcUrls: [getMainnetURI()],
                blockExplorerUrls: ["https://stardust-explorer.metis.io/"],
                nativeCurrency: {
                    name: "METIS",
                    symbol: "METIS",
                    decimals: 18,
                },
            },
        ],
    });
};

export const swithNetwork = async () => {
    if (window.ethereum) {
        try {
            await switchRequest();
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};
