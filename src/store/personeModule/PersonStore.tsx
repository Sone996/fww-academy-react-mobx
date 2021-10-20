import { makeAutoObservable, runInAction } from "mobx";
import { personService } from "./Person.service";

export class PersonStore {
  //   STATE
  myCourses: [] = [];
  notCompletedCourses: any = null;
  profileData: any = null;
  completedCourses: any = null;
  myStudents: any = null;
  // END :: STATE

  constructor() {
    makeAutoObservable(this);
  }

  //   COMPUTED
  get getMyCourses() {
    return this.myCourses;
  }
  get getNotCompletedCourses() {
    return this.notCompletedCourses;
  }
  get getProfileData() {
    return this.profileData;
  }
  get getCompletedCourses() {
    return this.completedCourses;
  }
  get getMyStudents() {
    return this.myStudents;
  }
  // END :: COMPUTED

  // MUTATIONS
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
  parseNotCompletedCourses = (data: any) => {
    let notCompletedCourses = data;
    notCompletedCourses.forEach((course: {}, i: number) => {
      notCompletedCourses[i] = {
        course_id: notCompletedCourses[i].course_id,
        course_name: notCompletedCourses[i].course_name,
        teacher_name: notCompletedCourses[i].teacher_name,
        average_mark: notCompletedCourses[i].average_mark,
        price: notCompletedCourses[i].price,
      };
    });
    return notCompletedCourses;
  };
  parseCompletedCourses = (data: any) => {
    let completedCourses = data;
    completedCourses.forEach((course: {}, i: number) => {
      completedCourses[i] = {
        course_id: completedCourses[i].course.id,
        course_name: completedCourses[i].course.name,
        mark: completedCourses[i].mark,
      };
    });
    return completedCourses;
  };
  // END :: MUTATIONS

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
  fetchNotCompletedCourses = async () => {
    try {
      const res = await personService.fetchNotCompletedCourses();
      runInAction(() => {
        this.notCompletedCourses = this.parseNotCompletedCourses(res.data);
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchProfile = async (id: number | string) => {
    try {
      const res = await personService.goProfile(id);
      runInAction(() => {
        this.profileData = res.data;
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchCompletedCourses = async (id: number) => {
    try {
      const res = await personService.fetchCompletedCourses(id);
      runInAction(() => {
        this.completedCourses = this.parseCompletedCourses(res.data);
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchMyStudents = async () => {
    try {
      const res = await personService.fetchMyStudents();
      runInAction(() => {
        this.myStudents = res.data;
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // END :: ACTIONS
}
