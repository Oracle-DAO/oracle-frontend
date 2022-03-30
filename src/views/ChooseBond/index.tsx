import { useSelector } from "react-redux";
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Skeleton } from "@material-ui/lab";

import { trim } from "../../helpers";
import useBonds from "../../hooks/bonds";
import { BondDataCard, BondTableData } from "./BondRow";
import "./choosebond.scss";
import { IReduxState } from "../../store/slices/state.interface";

import { ReactComponent as MoneyIcon } from "../../assets/icons/moneys.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart-square.svg";

function ChooseBond() {
    const { bonds } = useBonds();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const treasuryBalance = useSelector<IReduxState, number>(state => {
        return state.app.treasuryBalance;
    });

    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="bonds-wrapper">
                    <p className="section-title">Bonds</p>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <div className="card-wrapper">
                                <div className="card-icon"><MoneyIcon /></div>
                                <div className="card">
                                    <p className="card-title">Treasury Balance</p>
                                    <p className="card-value">
                                        {isAppLoading ? (
                                            <Skeleton width="180px" />
                                        ) : (
                                            new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 0,
                                                minimumFractionDigits: 0,
                                            }).format(treasuryBalance)
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <div className="card-wrapper">
                                <div className="card-icon"><ChartIcon /></div>
                                <div className="card">
                                    <p className="card-title">ORCL Price</p>
                                    <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : trim(marketPrice, 2)}</p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    {!isSmallScreen && (
                        <Grid container item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Bond</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Price</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">ROI</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">Purchased</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonds.map(bond => (
                                            <BondTableData key={bond.name} bond={bond} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </div>
            </Zoom>

            {isSmallScreen && (
                <div className="choose-bond-view-card-container">
                    <Grid container item spacing={2}>
                        {bonds.map(bond => (
                            <Grid item xs={12} key={bond.name}>
                                <BondDataCard key={bond.name} bond={bond} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default ChooseBond;
