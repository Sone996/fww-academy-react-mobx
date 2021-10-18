import { makeAutoObservable, runInAction } from "mobx";
import { personService } from "./Person.service";

export class PersonStore {
  //   STATE
  myCourses: [] = [];
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  get getMyCourses() {
    return this.myCourses;
  }
  // END :: COMPUTED

  //   ACTIONS
  fetchMyCourses = async (payload: number) => {
    try {
      const res = await personService.fetchMyCourses(payload);
      runInAction(() => {
        this.myCourses = this.parseMyCourses(res.data);
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  parseMyCourses = (data: any) => {
    let myCourses = data;
    myCourses.forEach((course: object, i: number) => {
      myCourses[i] = {
        id: myCourses[i].id,
        name: myCourses[i].name,
        average_mark: myCourses[i].average_mark,
        price: myCourses[i].price,
      };
    });
    return myCourses;
  };
  // END :: ACTIONS
}
