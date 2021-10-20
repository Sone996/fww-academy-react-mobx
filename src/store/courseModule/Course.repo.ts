import { api } from "../../api/Api";
import queryString from "query-string";
import { INewCourse } from "../../types/types";

const ROUTES = {
  STUDENTS: "/students",
  STUDENT: "/student",
  REQUEST_COURSE: "/request_course",
  COURSE: "/course",
  COURSES: "/courses",
  TEACHER: "/teacher",
};

class CourseRepo {
  studentsOnCourse(data: any) {
    const query = queryString.stringify(data);
    return api.get(`${ROUTES.STUDENTS}?${query}`);
  }

  buyCourse(data: any) {
    const URL = `${ROUTES.STUDENT}${ROUTES.REQUEST_COURSE}/${data.id}`;
    return api.post(URL, data.data);
  }

  createCourse(data: INewCourse) {
    return api.post(ROUTES.COURSES, data);
  }

  fetchSingleCours(data: any) {
    const URL = `${ROUTES.COURSES}/${data}`;
    return api.get(URL);
  }

  fetchAllCourses() {
    return api.get(ROUTES.COURSES);
  }

  // // fetchMyCourses(id) {
  // //     const URL = `${ROUTES.TEACHER}/${id}${ROUTES.COURSES}`;
  // //     return api.get(URL);
  // // }

  completeCourse(data: any) {
    const URL = `${ROUTES.STUDENT}/${data.userId}${ROUTES.COURSE}/${data.courseId}${ROUTES.TEACHER}/${data.teacherId}`;
    return api.patch(URL, data.data);
  }

  deleteCourse(id: number) {
    const URL = `${ROUTES.COURSES}/${id}`;
    console.log(URL)
    return api.delete(URL);
  }
}

export const courseRepo = new CourseRepo();
