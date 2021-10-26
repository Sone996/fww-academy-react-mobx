import { makeAutoObservable, runInAction } from "mobx";

export class AppStore {
  // STATE
  toggleModal: boolean = false;
  overlay: boolean = false;
  modal: any = {
    name: "",
    status: false,
    data: null,
  };
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  get getModal() {
    return this.modal;
  }
  // END :: COMPUTED

  //   ACTIONS
  setModal = (name: string, status: boolean, data: any) => {
    runInAction(() => {
      this.modal.name = name;
      this.modal.status = status;
      this.modal.data = data;
    });
  };
  closeModal = () => {
    runInAction(() => {
      this.modal = {
        name: "",
        status: false,
        data: null,
      };
    });
  };
  // END :: ACTIONS
}
