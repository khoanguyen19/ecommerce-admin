import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  addUsersFailure,
  addUsersStart,
  addUsersSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
} from "./usersRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product/find");
    console.log(res);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await publicRequest.put(`/product/${id}`, { product });
    console.log(res.data);
    dispatch(updateProductSuccess({ _id: res.data._id, product: res.data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await publicRequest.post("/product", product);
    dispatch(addProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get("/user/find");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`/user/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (error) {
    dispatch(deleteUsersFailure());
  }
};

export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await publicRequest.put(`/user/${id}`, user);
    console.log(res.data);
    dispatch(updateUsersSuccess({ _id: res.data._id, user: res.data }));
  } catch (error) {
    dispatch(updateUsersFailure());
  }
};

export const addUsers = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await publicRequest.post("/user", user);
    dispatch(addUsersSuccess(res.data));
  } catch (error) {
    dispatch(addUsersFailure());
  }
};
