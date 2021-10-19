import { FC } from "react";
import { ISingleCourse } from "../../types/types";
import Scroll from "../shared/Scroll";
import SimpleTable from "../shared/SimpleTable";

const SingleCourseTeacherComponent: FC<{ tableData: ISingleCourse }> = ({
  tableData,
}) => {
  const titles = ["User Id", "User", "Course Start Date", "Complete"];

  return (
    <div className="single-course-component flex flex-col justify-center h-full w-11/12 text-xl">
      <span className="py-4">Students on this course</span>
      <div className="relative h-full w-full">
        <Scroll>
          <SimpleTable model={tableData} titles={titles}></SimpleTable>
        </Scroll>
      </div>
    </div>
  );
};

export default SingleCourseTeacherComponent;
