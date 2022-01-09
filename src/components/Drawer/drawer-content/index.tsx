import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import OracleDaoIcon from "../../../assets/icons/oracle-logo.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import LaunchPad from "../../../assets/icons/launchpads.png";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import GlobeIcon from "../../../assets/icons/wonderglobe.svg";
import NetSwapLogo from "../../../assets/icons/netswap_logo.svg";
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
        if (currentPath.indexOf("hyperbond") >= 0 && page === "hyperbond") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="https://testapp.oracledao.finance" target="_blank">
                    <img alt="" src={OracleDaoIcon} style={{ width: 180, height: 180 }} />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://stardust-explorer.metis.io/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} />
                            <p>Dashboard</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/stake"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "stake");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>Stake</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/hyperbond"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "hyperbond");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>HyperBonding</p>
                        </div>
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
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>Bond</p>
                        </div>
                    </Link>

                    <div className="bond-discounts">
                        <p>Bond discounts</p>
                        {bonds.map((bond, i) => (
                            <Link component={NavLink} to={`/mints/${bond.name}`} key={i} className={"bond"}>
                                {!bond.bondDiscount ? (
                                    <Skeleton variant="text" width={"150px"} />
                                ) : (
                                    <p>
                                        {bond.displayName}
                                        <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>

                    <Link
                        component={NavLink}
                        to="/calculator"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "calculator");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={GlobeIcon} />
                            <p>Calculator</p>
                        </div>
                    </Link>
                    <Link className={classnames("button-dapp-menu", { active: false })}>
                        <div className="dapp-menu-item">
                            <img alt="" src={LaunchPad} />
                            <p>
                                LaunchPads
                                <span id="sup">Coming Soon</span>
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="dapp-menu-bottom-content">
                <div className="dapp-menu-doc-link">
                    <Link href="https://docs.oracledao.finance/" target="_blank">
                        <img alt="" src={DocsIcon} />
                        <p>Docs</p>
                    </Link>
                </div>
                <div className="dapp-menu-doc-link">
                    <Link href="https://netswap.io/#/swap" target="_blank">
                        <img alt="" src={NetSwapLogo} />
                        <p>Buy On NetSwap</p>
                    </Link>
                </div>
                <Social />
            </div>
        </div>
    );
}

export default NavContent;
