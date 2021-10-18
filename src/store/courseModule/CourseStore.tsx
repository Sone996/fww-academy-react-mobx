import { makeAutoObservable, runInAction } from "mobx";
import { courseService } from "./Course.service";

export class CourseStore {
  //   STATE
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  // END :: COMPUTED

  //   ACTIONS
  // END :: ACTIONS
}
