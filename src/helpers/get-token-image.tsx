import ORCLImg from "../assets/tokens/ORCL.png";
import sORCLImg from "../assets/tokens/sORCL.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "orcl") {
        return toUrl(ORCLImg);
    }

    if (name === "sorcl") {
        return toUrl(sORCLImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
