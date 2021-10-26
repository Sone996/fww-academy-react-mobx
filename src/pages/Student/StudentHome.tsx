import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import SimpleTable from "../../components/shared/SimpleTable";
import Scroll from "../../components/shared/Scroll";
import { IBasicCourseData } from "../../types/types";
import { RootStore } from "../../store";
import { observer } from "mobx-react-lite";

const StudentHome: FC = observer(() => {
  const { personStore, authStore, appStore } = RootStore();
  const titles = ["Id", "Course Name", "Teacher Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: IBasicCourseData) => {
    history.push({ pathname: `/single-course/${item.course_id}` });
  };

  useEffect(() => {
    personStore.fetchNotCompletedCourses();
  }, [personStore]);

  useEffect(() => {
    personStore
      .fetchNotRatedCourses(authStore.loggedUser.id)
      .then((res) => {
        if (Object.keys(res).length > 0) {
          appStore.setModal("rate-course", true, res);
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  }, [authStore, personStore, appStore]);

  return (
    <div className="student-home flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>Courses List</span>
      </div>
      <div className="flex w-full h-full py-16 pl-5">
        <div className="relative h-full w-3/4">
          {personStore.getNotCompletedCourses ? (
            <Scroll>
              <SimpleTable
                singleView={singleView}
                model={personStore.notCompletedCourses}
                titles={titles}
              />
            </Scroll>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
});

export default StudentHome;
