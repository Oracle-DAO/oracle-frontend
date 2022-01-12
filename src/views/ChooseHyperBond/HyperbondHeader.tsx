import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import BondLogo from "../../components/BondLogo";
import AdvancedSettings from "../Bond/AdvancedSettings";
import { IconButton, Link, SvgIcon } from "@material-ui/core";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import { useEscape } from "../../hooks";
import { IAllBondData } from "../../hooks/hyperbond";

interface IBondHeaderProps {
    bond: IAllBondData;
    slippage: number;
    onSlippageChange: (e: any) => void;
}

function HyperbondHeader({ bond, slippage, onSlippageChange }: IBondHeaderProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let history = useHistory();

    useEscape(() => {
        if (open) handleClose;
        else history.push("/hyperbond");
    });

    return (
        <div className="bond-header">
            <Link component={NavLink} to="/hyperbond" className="cancel-bond">
                <SvgIcon color="primary" component={XIcon} />
            </Link>

            <div className="bond-header-logo">
                <BondLogo bond={bond} />
                <div className="bond-header-name">
                    <p>{bond.displayName}</p>
                </div>
            </div>

            <div className="bond-settings">
                <IconButton onClick={handleOpen}>
                    <SvgIcon color="primary" component={SettingsIcon} />
                </IconButton>
                <AdvancedSettings open={open} handleClose={handleClose} slippage={slippage} onSlippageChange={onSlippageChange} />
            </div>
        </div>
    );
}

export default HyperbondHeader;
