import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "../../assets/icons/hamburger.svg";
import TimeMenu from "./time-menu";
import ConnectButton from "./connect-button";
import "./header.scss";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";
import CollectRewardsButton from "./collect_rewards";
import { useWeb3Context } from "../../hooks";

interface IHeader {
    handleDrawerToggle: () => void;
    drawe: boolean;
}

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%",
        },
        background: "transparent",
        backdropFilter: "none",
        zIndex: 10,
    },
    topBar: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: DRAWER_WIDTH,
    },
    topBarShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
}));

function Header({ handleDrawerToggle, drawe }: IHeader) {
    const classes = useStyles();
    const isVerySmallScreen = useMediaQuery("(max-width: 400px)");
    const isSmallScreen = useMediaQuery("(max-width: 800px)");
    const isWrapShow = useMediaQuery("(max-width: 480px)");
    const { connected, address } = useWeb3Context();
    const [trimmedAddress, setTrimmedAddress] = useState("");

    const smartTrim = function (str: string, maxLength: number) {
        if (!str) return str;
        if (maxLength < 1) return str;
        if (str.length <= maxLength) return str;
        if (maxLength == 1) return str.substring(0, 1) + "...";
        return str.substring(0, 8) + "............" + str.substring(str.length - 8);
    };

    useEffect(() => {
        if (connected && address) {
            setTrimmedAddress(smartTrim(address, 26));
        }
    }, [connected, address]);

    return (
        <div className={`${classes.topBar} ${!drawe && classes.topBarShift}`}>
            <AppBar position="sticky" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters className="dapp-topbar">
                    <div onClick={handleDrawerToggle} className="dapp-topbar-slider-btn">
                        <img src={MenuIcon} alt="" />
                    </div>
                    <div className="dapp-topbar-btns-wrap">
                        {connected && !isSmallScreen && (
                            <>
                                <p className="wallet-address" title={address}>
                                    {trimmedAddress}
                                </p>
                                {/* <p className="red-dot"></p> */}
                            </>
                        )}
                        {!isVerySmallScreen && <TimeMenu />}
                        {!isWrapShow && <CollectRewardsButton />}
                        <ConnectButton />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
