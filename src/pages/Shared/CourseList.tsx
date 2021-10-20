import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { RootStore } from "../../store";
import Scroll from "../../components/shared/Scroll";
import SimpleTable from "../../components/shared/SimpleTable";

const CourseList: FC = observer(() => {
  const { courseStore } = RootStore();
  const titles = ["Id", "Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/single-course/${item.id}` });
  };

  useEffect(() => {
    courseStore.fetchAllCourses();
  }, [courseStore]);

  return (
    <div className="professor-home flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>All Courses</span>
      </div>
      <div className="flex w-full h-full py-16 pl-5">
        <div className="relative h-full w-3/4">
          {courseStore.getAllCourses ? (
            <Scroll>
              <SimpleTable
                singleView={singleView}
                model={courseStore.getAllCourses}
                titles={titles}
              ></SimpleTable>
            </Scroll>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CourseList;
