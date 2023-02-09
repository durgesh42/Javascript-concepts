import _ from "lodash"

let swapMap = {
    "life_free": "life_Lite_free",
    "month_free": "month_lite_free",
}

let resp = { productId: "life_free" }


let tempResp = JSON.stringify(resp);

_.keys(swapMap).forEach((tools) => {
    tempResp = tempResp?.replace(new RegExp(tools, "g"), swapMap[tools]);
})
resp = JSON.parse(tempResp);