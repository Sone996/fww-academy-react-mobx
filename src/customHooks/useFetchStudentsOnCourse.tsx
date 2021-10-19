import { useEffect, useState } from "react";
import { RootStore } from "../store";

export default function useFetchStudentsOnCourse(id: any) {
  const { courseStore } = RootStore();
  const [studentsOnCourse, setStudentsOnCourse] = useState(null);

  useEffect(() => {
    courseStore
      .fetchStudentsOnCourse(id)
      .then((res) => {
        setStudentsOnCourse(res);
      })
      .catch((err) => {
        console.log("err");
        setStudentsOnCourse(err);
      });
  }, [id, courseStore]);

  return studentsOnCourse;
}
