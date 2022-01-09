import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import allBonds from "../helpers/hyperbond";
import { IUserHyperBondDetails } from "../store/slices/account-slice";
import { Bond } from "../helpers/bond/bond";
import { IHyperBondDetails, IHyperBondSlice } from "../store/slices/hyperbond_slice";
import { IReduxState } from "../store/slices/state.interface";

// Smash all the interfaces together to get the BondData Type
export interface IAllBondData extends Bond, IHyperBondDetails, IUserHyperBondDetails {}

const initialBondArray = allBonds;

// Slaps together bond data within the account & bonding states
function useHyperBonds() {
    const bondLoading = useSelector<IReduxState, boolean>(state => state.hyperbonding.loading);
    const bondState = useSelector<IReduxState, IHyperBondSlice>(state => state.hyperbonding);
    const accountBondsState = useSelector<IReduxState, { [key: string]: IUserHyperBondDetails }>(state => state.account.hyperbonds);
    //@ts-ignore
    const [hyperbonds, setHyperbonds] = useState<IAllBondData[]>(initialBondArray);

    useEffect(() => {
        let bondDetails: IAllBondData[];
        bondDetails = allBonds
            .flatMap(bond => {
                if (bondState[bond.name] && bondState[bond.name].bondDiscount) {
                    return Object.assign(bond, bondState[bond.name]); // Keeps the object type
                }
                return bond;
            })
            .flatMap(bond => {
                if (accountBondsState[bond.name]) {
                    return Object.assign(bond, accountBondsState[bond.name]);
                }
                return bond;
            });
        const mostProfitableBonds = bondDetails.concat().sort((a, b) => {
            return a["bondDiscount"] > b["bondDiscount"] ? -1 : b["bondDiscount"] > a["bondDiscount"] ? 1 : 0;
        });

        setHyperbonds(mostProfitableBonds);
    }, [bondState, accountBondsState, bondLoading]);

    return { hyperbonds, loading: bondLoading };
}

export default useHyperBonds;
