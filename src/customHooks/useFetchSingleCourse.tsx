import { useEffect, useState } from "react";
import { RootStore } from "../store";

export default function useFetchSingleCourse(id: any) {
  const { courseStore } = RootStore();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    courseStore
      .fetchSingleCourse(id)
      .then((res) => {
        setCourse(res);
      })
      .catch((err) => {
        console.log(err);
        setCourse(err);
      });
  }, [id, courseStore]);

  return course;
}
