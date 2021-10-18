import { api } from "../../api/Api";

const ROUTES = {
  COURSE: "/course",
  COURSES: "/courses",
  TEACHER: "/teacher",
  STUDENTS: "/students",
  STUDENT: "/student",
  REQUEST_COURSE: "/request_course",
  USERS: "/users",
  COMPLETE_COURSE: "/complete_course",
  RATE_COURSE: "/rate_course",
};

class PersonRepo {
  goProfile(id: any) {
    return api.get(`${ROUTES.USERS}/${id}`);
  }

  fetchNotCompletedCourses() {
    const URL = `${ROUTES.STUDENT}${ROUTES.COURSES}`;
    return api.get(URL);
  }

  fetchCompletedCourses(id: number) {
    const URL = `${ROUTES.STUDENTS}/${id}${ROUTES.COMPLETE_COURSE}`;
    return api.get(URL);
  }

  fetchMyCourses(id: number) {
    const URL = `${ROUTES.TEACHER}/${id}${ROUTES.COURSES}`;
    return api.get(URL);
  }

  fetchMyStudents() {
    return api.get(ROUTES.STUDENTS);
  }

  fetchAplicationRequests() {
    const URL = `${ROUTES.TEACHER}${ROUTES.REQUEST_COURSE}`;
    return api.get(URL);
  }

  resolveRequest(data: any) {
    const URL = `${ROUTES.TEACHER}${ROUTES.REQUEST_COURSE}/${data.courseId}`;
    return api.post(URL, data.data);
  }

  fetchNotRatedCourses(data: any) {
    const URL = `${ROUTES.STUDENT}/${data}${ROUTES.RATE_COURSE}`;
    return api.get(URL);
  }

  completeCourse(data: any) {
    const URL = `${ROUTES.STUDENT}/${data.personId}${ROUTES.RATE_COURSE}`;
    return api.post(URL, data.data);
  }
}

export const personRepo = new PersonRepo();
