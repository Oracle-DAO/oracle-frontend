const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa515" }],
    });
};

const addChainRequest = () => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0xa515",
                chainName: "Oasis Emerald Testnet",
                rpcUrls: ["https://testnet.emerald.oasis.dev"],
                blockExplorerUrls: ["https://testnet.explorer.emerald.oasis.dev"],
                nativeCurrency: {
                    name: "OASIS",
                    symbol: "OASIS",
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
