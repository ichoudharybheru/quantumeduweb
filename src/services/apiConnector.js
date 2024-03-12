import axios from "axios";

export const axiosIntance = axios.create({});

export const apiConnector = (method, url, bodydata, headers, params) => {
  return axiosIntance({
    method: `${method}`,
    url: `${url}`,
    data: bodydata ? bodydata : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
