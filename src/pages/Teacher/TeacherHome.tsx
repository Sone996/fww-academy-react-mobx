import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import SimpleTable from "../../components/shared/SimpleTable";
import Scroll from "../../components/shared/Scroll";
import { RootStore } from "../../store";
import { IBasicTeacherCourseData } from "../../types/types";

const TeacherHome: FC = observer(() => {
  const { personStore, authStore } = RootStore();
  const titles = ["Id", "Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: IBasicTeacherCourseData) => {
    history.push({ pathname: `/single-course/${item.id}` });
  };

//   const fetchMyCourses = () => {
//     personStore
//       .fetchMyCourses(authStore.loggedUser.id)
//       .then()
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  useEffect(() => {
    // fetchMyCourses();
    personStore.fetchMyCourses(authStore.loggedUser.id);
  }, [personStore, authStore.loggedUser.id]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="relative h-full w-3/4">
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
  );
});

export default TeacherHome;
