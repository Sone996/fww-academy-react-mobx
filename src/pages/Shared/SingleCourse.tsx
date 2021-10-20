import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFetchSingleCourse from "../../customHooks/useFetchSingleCourse";
import { RootStore } from "../../store";
// // COMPONENTS
import SingleCourseTeacherComponent from "../../components/Teacher/SingleCourseTeacherComponent";
// import SingleCourseStudentComponent from "../../Components/Student/SingleCourseStudentComponent";
// END :: COMPONENTS

const SingleCourse: FC = observer(() => {
  const { courseStore, authStore } = RootStore();

  const history = useHistory();
  let x = history.location.pathname.split("/");
  let id = x[x.length - 1];

  useFetchSingleCourse(authStore.loggedUser.id);

  console.log("single course!!!!!!!!!!!!!");

  useEffect(() => {
    courseStore
      .fetchStudentsOnCourse({ course_id: id })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {authStore.loggedUser.role === "teacher" ? (
        <SingleCourseTeacherComponent
          tableData={courseStore.getStudentsOnCourse}
          singleCourse={courseStore.getSingleCourse}
        />
      ) : (
        <div className="course flex w-full">
          {/* {singleCourse.isLoading ? (
          <div>loading...</div>
        ) : singleCourse.isError ? (
          <div>{singleCourse.error.message}</div>
        ) : (
          <>
            <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
              <div className="flex flex-col w-full items-start">
                <span>Name: {singleCourse.data.data.name}</span>
                <span>Price: {singleCourse.data.data.price}</span>
              </div>
              <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
                <span>{singleCourse.data.data.description}</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              {singleCourse ? (
                <SingleCourseStudentComponent data={singleCourse.data.data} />
              ) : (
                <></>
              )}
            </div>
          </>
        )} */}
        </div>
      )}
    </>
  );
});

export default SingleCourse;
