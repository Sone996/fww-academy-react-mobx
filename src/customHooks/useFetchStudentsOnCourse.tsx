import { useEffect, useState } from "react";
import { RootStore } from "../store";

export default function useFetchStudentsOnCourse(id: any) {
  const { courseStore, authStore } = RootStore();
  const [studentsOnCourse, setStudentsOnCourse] = useState(null);

  useEffect(() => {
    // if (authStore.loggedUser.length > 0) {
      courseStore
        .fetchStudentsOnCourse(id)
        .then((res) => {
          setStudentsOnCourse(res);
        })
        .catch((err) => {
          console.log("err");
          // setStudentsOnCourse(err);
        });
    // }
  }, [id, courseStore]);

  return studentsOnCourse;
}
