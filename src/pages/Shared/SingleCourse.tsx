import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFetchSingleCourse from "../../customHooks/useFetchSingleCourse";
import { RootStore } from "../../store";
// // COMPONENTS
import SingleCourseTeacherComponent from "../../components/Teacher/SingleCourseTeacherComponent";
import SingleCourseStudentComponent from "../../components/Student/SingleCourseStudentComponent";
// END :: COMPONENTS

const SingleCourse: FC = observer(() => {
  const { courseStore, authStore } = RootStore();

  const history = useHistory();
  let x = history.location.pathname.split("/");
  let id = x[x.length - 1];

  useFetchSingleCourse(id);

  useEffect(() => {
    courseStore
      .fetchStudentsOnCourse({ course_id: id })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [id, courseStore]);

  return (
    <>
      {courseStore.singleCourse ? (
        authStore.loggedUser.role === "teacher" ? (
          <SingleCourseTeacherComponent
            tableData={courseStore.getStudentsOnCourse}
            singleCourse={courseStore.getSingleCourse}
          />
        ) : (
          <SingleCourseStudentComponent data={courseStore.getSingleCourse} />
        )
      ) : (
        <div>loading...</div>
      )}
    </>
  );
});

export default SingleCourse;
