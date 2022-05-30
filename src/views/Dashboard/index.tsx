import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { trim } from "../../helpers";
import "./dashboard.scss";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";

import { ReactComponent as WalletIcon } from "../../assets/icons/wallet-money.svg";
import { ReactComponent as MoneyIcon } from "../../assets/icons/moneys.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart-square.svg";

function Dashboard() {
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    return (
        <div className="dashboard-view">
            <Zoom in={true}>
                <Grid container spacing={4}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <MoneyIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title">ORFI Price</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="150px" /> : `$${trim(app.marketPrice, 2)}`}</p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <WalletIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title">Market Cap</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="150px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.marketCap)
                                    )}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Supply (Staked/Total)</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="250px" />
                                    ) : (
                                        `${new Intl.NumberFormat("en-US", {
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.circSupply)}
                                        /
                                        ${new Intl.NumberFormat("en-US", {
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.totalSupply)}`
                                    )}
                                </p>
                            </div>
                        </Grid> */}

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <ChartIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title">TVL</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="150px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        }).format(app.stakingTVL)
                                    )}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <MoneyIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title">TAV</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="150px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        }).format(app.tav)
                                    )}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <WalletIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title">Treasury Balance</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="150px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.treasuryBalance)
                                    )}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div className="card-wrapper">
                            <div className="card-icon">
                                <ChartIcon />
                            </div>
                            <div className="dashboard-card">
                                <p className="card-title"> RFV </p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="150px" />
                                    ) : (
                                        `${new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        }).format(app.rfv)}`
                                    )}
                                </p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Zoom>
        </div>
    );
}

export default Dashboard;
