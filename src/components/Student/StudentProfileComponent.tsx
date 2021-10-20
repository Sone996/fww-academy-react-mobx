import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import SimpleTable from "../shared/SimpleTable";
import Scroll from "../shared/Scroll";
import { RootStore } from "../../store";

const StudentProfileComponent: FC = observer(() => {
  const titles = ["Id", "Course Name", "Mark"];

  const { authStore, personStore } = RootStore();
  useEffect(() => {
    if (authStore.loggedUser.id) {
      personStore.fetchCompletedCourses(authStore.loggedUser.id);
    }
  }, [authStore.loggedUser, personStore]);

  return (
    <div className="user-profile-component flex flex-col h-full">
      <div className="flex flex-col text-xl h-full pt-6">
        <div className="flex pl-6">
          <span>My Completed Courses</span>
        </div>
        <div className="flex flex-col justify-center h-full p-16">
          <div className="relative h-full w-full">
            {personStore.getCompletedCourses ? (
              <Scroll>
                <SimpleTable
                  model={personStore.getCompletedCourses}
                  titles={titles}
                />
              </Scroll>
            ) : (
              <div>loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default StudentProfileComponent;
