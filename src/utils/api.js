import network from './network';

// 登录
export function loginUser(data) {
  return network({
    url: `/login`,
    method: "post",
    data
  })
}

// 注册
export function registerUser(data) {
  return network({
    url: `/register`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwd(data) {
  return network({
    url: `/resetPwd`,
    method: "post",
    data
  })
}
