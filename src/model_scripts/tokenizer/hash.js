import { createHash } from "crypto";

export function md5ToBigInt(text) {
    const hash = createHash("md5")
        .update(text, "utf8")
        .digest("hex");

    return BigInt("0x" + hash);
}