import {createSlice} from "@reduxjs/toolkit";
import {cacheToken, getToken, removeToken} from "@/utils/token";
import {getUserProfileApi, loginApi} from "@/apis/user";


const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {} // 用户信息
  },
  // 同步修改方法
  reducers: {
    // 设置token
    setToken(state, action) {
      state.token = action.payload
      cacheToken(action.payload)
    },
    // 设置用户信息
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    // 清除用户信息
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    },
  }
});

// 解构出actionCreator
const {setToken, setUserInfo, clearUserInfo} = userStore.actions;

// 异步方法封装

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const result = await loginApi(loginForm)
    dispatch(setToken(result.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const result = await getUserProfileApi()
    dispatch(setUserInfo(result.data))
  }
}

// 获取reducer函数
const userReducer = userStore.reducer;

export {fetchLogin, fetchUserInfo, setToken, clearUserInfo}
export default userReducer
