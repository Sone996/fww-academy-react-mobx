import { makeAutoObservable, runInAction } from "mobx";

export class AuthStore {
  //   STATE
  login: any = [];
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  // END :: COMPUTED

  //   ACTIONS
  // END :: ACTIONS
}
