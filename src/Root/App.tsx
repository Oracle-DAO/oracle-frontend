import { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loadable from "@loadable/component";

import { useAddress, useWeb3Context } from "../hooks";
import { calcBondDetails } from "../store/slices/bond-slice";
import { loadAppDetails } from "../store/slices/app-slice";
import { calculateUserBondDetails, calculateUserTokenDetails, loadAccountDetails } from "../store/slices/account-slice";
import { IReduxState } from "../store/slices/state.interface";
import Loading from "../components/Loader";
import useBonds from "../hooks/bonds";
import ViewBase from "../components/ViewBase";
import "./style.scss";
import useTokens from "../hooks/tokens";

const Dashboard = loadable(() => import("../views/Dashboard/index"), {
    fallback: <Loading />,
});

const Bond = loadable(() => import("../views/Bond/index"), {
    fallback: <Loading />,
});

const ChooseBond = loadable(() => import("../views/ChooseBond/index"), {
    fallback: <Loading />,
});

const NotFound = loadable(() => import("../views/404/index"), {
    fallback: <Loading />,
});

const Stake = loadable(() => import("../views/Stake/index"), {
    fallback: <Loading />,
});

function App() {
    const dispatch = useDispatch();

    const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
    const address = useAddress();

    const [walletChecked, setWalletChecked] = useState(false);

    const isAppLoaded = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));

    const { bonds } = useBonds();
    const { tokens } = useTokens();

    async function loadDetails(whichDetails: string) {
        let loadProvider = provider;
        if (whichDetails === "app") {
            loadApp(loadProvider);
        }

        if (whichDetails === "account" && address && connected) {
            loadAccount(loadProvider);
            if (isAppLoaded) return;

            loadApp(loadProvider);
        }

        if (whichDetails === "userBonds" && address && connected) {
            bonds.map(bond => {
                dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
            });
        }

        if (whichDetails === "userTokens" && address && connected) {
            tokens.map(token => {
                dispatch(calculateUserTokenDetails({ address, token, provider, networkID: chainID }));
            });
        }
    }

    const loadApp = useCallback(
        loadProvider => {
            dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
            bonds.map(bond => {
                dispatch(calcBondDetails({ bond, value: null, provider: loadProvider, networkID: chainID }));
            });
            tokens.map(token => {
                dispatch(calculateUserTokenDetails({ address: "", token, provider, networkID: chainID }));
            });
        },
        [connected],
    );

    const loadAccount = useCallback(
        loadProvider => {
            dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
        },
        [connected],
    );

    useEffect(() => {
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    }, []);

    useEffect(() => {
        if (walletChecked) {
            loadDetails("app");
            loadDetails("account");
            loadDetails("userBonds");
            loadDetails("userTokens");
        }
    }, [walletChecked]);

    useEffect(() => {
        if (connected) {
            loadDetails("app");
            loadDetails("account");
            loadDetails("userBonds");
            loadDetails("userTokens");
        }
    }, [connected]);

    return (
        <ViewBase>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/">
                    <Redirect to="/stake" />
                </Route>

                <Route path="/stake">
                    <Stake />
                </Route>

                <Route path="/mints">
                    {bonds.map(bond => {
                        return (
                            <Route exact key={bond.name} path={`/mints/${bond.name}`}>
                                <Bond bond={bond} />
                            </Route>
                        );
                    })}
                    <ChooseBond />
                </Route>

                <Route component={NotFound} />
            </Switch>
        </ViewBase>
    );
}

export default App;
