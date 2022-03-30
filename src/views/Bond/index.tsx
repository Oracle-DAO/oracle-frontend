import { useState } from "react";
import { useSelector } from "react-redux";
import { trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import BondHeader from "./BondHeader";
import BondRedeem from "./BondRedeem";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useWeb3Context } from "../../hooks";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAllBondData } from "../../hooks/bonds";
import classnames from "classnames";

import { ReactComponent as MoneyIcon } from "../../assets/icons/moneys.svg";

interface IBondProps {
    bond: IAllBondData;
}

function Bond({ bond }: IBondProps) {
    const { address } = useWeb3Context();

    const [slippage, setSlippage] = useState(0.5);

    const [view, setView] = useState(0);

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);

    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const onSlippageChange = (value: any) => {
        return setSlippage(value);
    };

    const changeView = (newView: number) => () => {
        setView(newView);
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <Grid className="bond-view">
                <Backdrop open={true}>
                    <Fade in={true}>
                        <div className="bond-card">
                            <BondHeader bond={bond} slippage={slippage} onSlippageChange={onSlippageChange} />
                            {/* @ts-ignore */}
                            <Box direction="row" className="bond-price-data-row">
                                <div className="card-wrapper">
                                    <div className="card-icon"><MoneyIcon /></div>
                                    <div className="card">
                                        <p className="card-title">Bond Price</p>
                                        <p className="card-value">
                                            {isBondLoading ? <Skeleton /> : bond.isLP || bond.name === "wavax" ? `$${trim(bond.bondPrice, 2)}` : `${trim(bond.bondPrice, 2)} MIM`}
                                        </p>
                                    </div>
                                </div>
                                <div className="card-wrapper">
                                    <div className="card-icon"><MoneyIcon /></div>
                                    <div className="card">
                                        <p className="card-title">ORCL Price</p>
                                        <p className="card-value">
                                            {isBondLoading ? <Skeleton /> : `$${trim(marketPrice, 2)}`}
                                        </p>
                                    </div>
                                </div>
                            </Box>

                            <div className="bond-one-table">
                                <div className={classnames("bond-one-table-btn", { active: !view })} onClick={changeView(0)}>
                                    <p>Bond</p>
                                </div>
                                <div className={classnames("bond-one-table-btn", { active: view })} onClick={changeView(1)}>
                                    <p>Redeem</p>
                                </div>
                            </div>

                            <TabPanel value={view} index={0}>
                                <BondPurchase bond={bond} slippage={slippage} />
                            </TabPanel>

                            <TabPanel value={view} index={1}>
                                <BondRedeem bond={bond} />
                            </TabPanel>
                        </div>
                    </Fade>
                </Backdrop>
            </Grid>
        </Fade>
    );
}

export default Bond;
