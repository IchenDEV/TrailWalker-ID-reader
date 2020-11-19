const env = process.env ? process.env.NODE_ENV : "production";
const devUrl = `https://walk.jh.zjutjh.com`;
const serverUrl = `https://walk.jh.zjutjh.com`;

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
