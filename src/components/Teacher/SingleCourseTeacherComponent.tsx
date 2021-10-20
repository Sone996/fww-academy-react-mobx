import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useHistory } from "react-router";
import { RootStore } from "../../store";
import { ISingleCourse } from "../../types/types";
import Scroll from "../shared/Scroll";
import SimpleTable from "../shared/SimpleTable";

const SingleCourseTeacherComponent: FC<{
  tableData: ISingleCourse;
  singleCourse: ISingleCourse;
}> = observer(({ tableData, singleCourse }) => {
  const { courseStore } = RootStore();
  const history = useHistory();

  const titles = ["User Id", "User", "Course Start Date", "Complete"];

  const deleteCourseHandler = () => {
    courseStore
      .deleteCourse(singleCourse.id)
      .then((res) => {
        history.push("/teacher-home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="course flex w-full">
      <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
        <div className="flex flex-col w-full items-start">
          <span>Name: {singleCourse?.name}</span>
          <span>Price: {singleCourse?.price}</span>
        </div>
        <div className="flex border whitespace-pre-line w-full h-full overflow-y-auto mb-4">
          <span>{singleCourse?.description}</span>
        </div>
        <div className="flex justify-end w-full">
          <span className="button bg-darkRed" onClick={deleteCourseHandler}>
            Delete
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center w-2/3">
        <div className="single-course-component flex flex-col justify-center h-full w-11/12 text-xl">
          <span className="py-4">Students on this course</span>
          <div className="relative h-full w-full">
            {tableData ? (
              <Scroll>
                <SimpleTable model={tableData} titles={titles}></SimpleTable>
              </Scroll>
            ) : (
              <div>nema studenata</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default SingleCourseTeacherComponent;
