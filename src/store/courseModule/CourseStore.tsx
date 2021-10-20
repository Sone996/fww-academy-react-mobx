import { makeAutoObservable, runInAction } from "mobx";
import { courseService } from "./Course.service";

export class CourseStore {
  //   STATE
  studentsOnCourse: any = null;
  singleCourse: any = null;
  allCourses: any = null;
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
  get getAllCourses() {
    return this.allCourses;
  }
  // END :: COMPUTED

  // MUTATIONS
  parseAllCourses = (data: any) => {
    let allCouresList = data;
    allCouresList.forEach((student: {}, i: number) => {
      allCouresList[i] = {
        id: allCouresList[i].id,
        name: allCouresList[i].name,
        average_mark: allCouresList[i].average_mark,
        price: allCouresList[i].price,
      };
    });
    return allCouresList;
  };
  // END :: MUTATIONS

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
  buyCourse = async (data: any) => {
    try {
      const res = await courseService.buyCourse(data);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchAllCourses = async () => {
    try {
      const res = await courseService.fetchAllCourses();
      runInAction(() => {
        this.allCourses = this.parseAllCourses(res.data);
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  createCourse = async (data: any) => {
    try {
      const res = await courseService.createCourse(data);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // END :: ACTIONS
}
