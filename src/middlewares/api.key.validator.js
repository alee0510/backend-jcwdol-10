import fs from "fs";

export function apiKeyValidator (req, res, next) {
    // @get api key from headers
    const apiKey = req.headers["x-api-key"]

    // @read api keys from json file
    const apiKeys = JSON.parse(fs.readFileSync("./json/api.keys.json", "utf-8"));

    // @check if api key is valid
    const apiKeyIsValid = apiKeys.find(item => item.key === apiKey);

    // @if not valid
    if (!apiKeyIsValid) {
        return res.status(401).json({ message: "Invalid API Key" });
    }

    // @if api key is valid
    next()
}
