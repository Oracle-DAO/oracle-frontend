import { getMainnetURI } from "../hooks/web3/helpers";

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa516" }],
    });
};

const addChainRequest = () => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0xa516",
                chainName: "Oasis Emerald Mainnet",
                rpcUrls: [getMainnetURI()],
                blockExplorerUrls: ["https://explorer.emerald.oasis.dev/"],
                nativeCurrency: {
                    name: "ROSE",
                    symbol: "ROSE",
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
