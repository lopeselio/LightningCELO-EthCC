import getChainIcon from "./getChainIcon";

const shortenAddress = (address?: string) => {
    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    return shortAddress;
}

const convertFromUnix = (unixMs: number): string => {
    const date = new Date(unixMs);
    const converted = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    return converted;
}


export { shortenAddress, convertFromUnix, getChainIcon }