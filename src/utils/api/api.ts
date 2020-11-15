const env = process.env ? process.env.NODE_ENV : "production";

enum apiMap {
    userInfo = "/reader/user",
    groupInfo = "/reader/group",
    recode = "/reader/recode"

}

/**
 * get API url by API name
 * @return {string}
 */
function API(name: apiMap): string {
    const prefix = env === "development" ? `${devUrl}` : serverUrl;
    return `${prefix}${name}`;
}

export {API, apiMap};
