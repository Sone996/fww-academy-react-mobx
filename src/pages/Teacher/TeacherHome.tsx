import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import SimpleTable from "../../components/shared/SimpleTable";
import Scroll from "../../components/shared/Scroll";
import { RootStore } from "../../store";
import { IBasicTeacherCourseData } from "../../types/types";
import useFetchMyCourses from "../../customHooks/useFetchMyCourses";

const TeacherHome: FC = observer(() => {
  const { personStore } = RootStore();
  const titles = ["Id", "Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: IBasicTeacherCourseData) => {
    history.push({ pathname: `/single-course/${item.id}` });
  };

  useFetchMyCourses();

  // useEffect(() => {
  //   personStore.fetchMyCourses(authStore.loggedUser.id);
  // }, [personStore, authStore.loggedUser.id]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex border-b py-4 px-4 text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12 h-full">
        <div className="relative h-full w-full">
          {personStore.getMyCourses.length > 0 ? (
            <Scroll>
              <SimpleTable
                titles={titles}
                model={personStore.getMyCourses}
                singleView={singleView}
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

export default TeacherHome;
