import { makeAutoObservable, runInAction } from "mobx";
import { ILogin } from "../../types/types";
import { authService } from "./Auth.service";

export class AuthStore {
  //   STATE
  login: any = [];
  loggedUser: any = null;
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  // END :: COMPUTED

  //   ACTIONS
  loginAction = async (data: ILogin) => {
    try {
      const res = await authService.login(data);
      runInAction(() => {
        this.loggedUser = res.data;
      });
      return Promise.resolve(res);
    } catch (error) {
      Promise.reject(error);
    }
  };

  fetchActiveAccount = async () => {
    try {
      const res = await authService.fetchActiveAccount();
      runInAction(() => {
        this.loggedUser = res.data;
      });
      return Promise.resolve(res);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  logoutAction = async () => {
    try {
      const res = await authService.logout();
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // END :: ACTIONS
}
