import { makeAutoObservable, runInAction } from "mobx";
import { courseService } from "./Course.service";

export class CourseStore {
  //   STATE
  studentsOnCourse: any = null;
  singleCourse: any = null;
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  get getStudentsOnCourse() {
    return this.studentsOnCourse;
  }
  get getSingleCourse() {
    return this.singleCourse;
  }
  // END :: COMPUTED

  //   ACTIONS
  fetchStudentsOnCourse = async (id: any) => {
    try {
      const res = await courseService.studentsOnCourse(id);
      runInAction(() => {
        this.studentsOnCourse = res.data;
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchSingleCourse = async (id: number | string) => {
    try {
      const res = await courseService.fetchSingleCours(id);
      runInAction(() => {
        this.singleCourse = res.data;
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // END :: ACTIONS
}
