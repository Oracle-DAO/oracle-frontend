import ORFIImg from "../assets/tokens/ORFI.png";
import sORFIImg from "../assets/tokens/sORFI.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "ORFI") {
        return toUrl(ORFIImg);
    }

    if (name === "sORFI") {
        return toUrl(sORFIImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
