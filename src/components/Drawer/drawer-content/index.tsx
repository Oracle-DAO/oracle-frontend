import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";

import OracleDaoIcon from "../../../assets/icons/oracle-logo.svg";

import { ReactComponent as DashboardIcon } from "../../../assets/icons/dashboard-icon.svg";
import { ReactComponent as Docs } from "../../../assets/icons/stake.svg";
import { ReactComponent as StakeIcon } from "../../../assets/icons/stake-icon.svg";
import { ReactComponent as BondIcon } from "../../../assets/icons/bond-icon.svg";
import { ReactComponent as LaunchPad } from "../../../assets/icons/launchpad-icon.svg";
import { ReactComponent as DocsIcon } from "../../../assets/icons/setting-sm.svg";

import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import "./drawer-content.scss";
import classnames from "classnames";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();
    const { bonds } = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("mints") >= 0 && page === "mints") {
            return true;
        }
        if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="https://testapp.oracledao.finance" target="_blank">
                    <img alt="" src={OracleDaoIcon} style={{ width: 150 }} />
                </Link>

                {/*{address && (*/}
                {/*    <div className="wallet-link">*/}
                {/*        <Link href={`https://stardust-explorer.metis.io/address/${address}`} target="_blank">*/}
                {/*            <p>{shorten(address)}</p>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            <div className="dapp-menu-links">
                <Link
                    component={NavLink}
                    to="/dashboard"
                    isActive={(match: any, location: any) => {
                        return checkPage(location, "dashboard");
                    }}
                    className={classnames("button-dapp-menu", { active: isActive })}
                >
                    <DashboardIcon />
                    <p>Dashboard</p>
                </Link>

                <Link
                    component={NavLink}
                    to="/stake"
                    isActive={(match: any, location: any) => {
                        return checkPage(location, "stake");
                    }}
                    className={classnames("button-dapp-menu", { active: isActive })}
                >
                    <StakeIcon />
                    <p>Stake</p>
                </Link>

                <Link
                    component={NavLink}
                    id="bond-nav"
                    to="/mints"
                    isActive={(match: any, location: any) => {
                        return checkPage(location, "mints");
                    }}
                    className={classnames("button-dapp-menu", { active: isActive })}
                >
                    <BondIcon />
                    <p>Bond</p>
                </Link>

                <a href="https://test.launchpad.oracledao.finance/" target="_blank" className="button-dapp-menu">
                    <LaunchPad />
                    <p>LaunchPad</p>
                </a>
            </div>
            <div className="dapp-menu-bottom-content">
                <Link href="https://docs.oracledao.finance/" target="_blank">
                    <Docs />
                    <p>Docs</p>
                </Link>
                <Link href="https://app.yuzu-swap.com/#/swap" target="_blank">
                    <DocsIcon />
                    <p>Buy On Yuzu Swap</p>
                </Link>

                <Link href="https://dex.valleyswap.com/#/swap" target="_blank">
                    <DocsIcon />
                    <p>Buy On Valley Swap</p>
                </Link>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
