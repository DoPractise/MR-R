import request from "./../utils/http";
import { baseApi } from "./../config";

// 1小时热点
export function getHourData(params) {
  return request({
    baseURL: baseApi,
    url: "/mp/hot-discussion/hour/list",
    method: "get",
    params
  });
}

// 24小时热点
export function getDayData(params) {
  return request({
    baseURL: baseApi,
    url: "/mp/hot-discussion/day/list",
    method: "get",
    params
  });
}
