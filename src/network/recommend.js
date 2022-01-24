import {
    request
} from "./request";

export function getRecommend(iid) {
    return request({
        url: "recommend",
    })
}