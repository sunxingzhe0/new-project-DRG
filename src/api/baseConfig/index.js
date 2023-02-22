import request from "@/utils/request";

export function apiLogin(data) {
  return request({
    url: "/api/v1/login",
    method: "post",
    data,
  });
}
export function apiLoginOut(data) {
  return request({
    url: "/api/v1/apiLoginOut",
    method: "post",
    data,
  });
}
//获取列表
export function datasourceList(params) {
  return request({
    url: "/api/v1/datasource",
    method: "get",
    params,
  });
}
