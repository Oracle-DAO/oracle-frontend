import { useState } from "react";
import { DEFAULD_NETWORK, getAddresses, TOKEN_DECIMALS } from "../../../constants";
import { useSelector } from "react-redux";
import { Fade, Popper } from "@material-ui/core";
import "./time-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: TOKEN_DECIMALS,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

function TimeMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isEthereumAPIAvailable = window.ethereum;

    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULD_NETWORK;
    });

    // const faucet = () => async () => {
    //     if (!address) {
    //         dispatch(warning({ text: messages.please_connect_wallet }));
    //         return;
    //     }
    //     if (await checkWrongNetwork()) return;
    //     const token = "MIM";
    //     await dispatch(getTokens({ address, token, provider, networkID: chainID }));
    // };

    const addresses = getAddresses(networkID);

    const sORFI_ADDRESS = addresses.sORFI_ADDRESS;
    const ORFI_ADDRESS = addresses.ORFI_ADDRESS;

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="time-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="time-menu-btn">
                <p>Quick Links</p>
            </div>

            <Popper className="time-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            {/*<div className="tooltip-item" onClick={faucet()}>*/}
                            {/*    <p>Airdrop MIM</p>*/}
                            {/*</div>*/}
                            {isEthereumAPIAvailable && (
                                <div className="add-tokens">
                                    <div className="divider" />
                                    <p className="add-tokens-title">ADD TOKEN TO WALLET</p>
                                    <div className="divider" />
                                    <div className="tooltip-item" onClick={addTokenToWallet("ORFI", ORFI_ADDRESS)}>
                                        <p>ORFI</p>
                                    </div>
                                    <div className="tooltip-item" onClick={addTokenToWallet("sORFI", sORFI_ADDRESS)}>
                                        <p>sORFI</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

export default TimeMenu;
