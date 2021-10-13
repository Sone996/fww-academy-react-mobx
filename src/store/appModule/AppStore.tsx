import { makeAutoObservable } from "mobx";

export class AppStore {
  // STATE
  toggleModal: boolean = false;
  overlay: boolean = false;
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  // END :: COMPUTED

  //   ACTIONS
  // END :: ACTIONS
}
