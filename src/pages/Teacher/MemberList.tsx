import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import SimpleTable from "../../components/shared/SimpleTable";
import Scroll from "../../components/shared/Scroll";
import { RootStore } from "../../store";
import { useHistory } from "react-router";

const MemberList: FC = observer(() => {
  const { personStore } = RootStore();
  const titles = ["Id", "Student", "Course", "Date of Start"];
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/profile/${item.user_id}` });
  };

  useEffect(() => {
    personStore.fetchMyStudents();
  }, [personStore]);
  return (
    <div className="member-list flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Students</span>
      </div>
      <div className="relative w-3/4 h-full justify-center mt-16">
        {personStore.getMyStudents ? (
          <Scroll>
            <SimpleTable
              singleView={singleView}
              model={personStore.getMyStudents}
              titles={titles}
            ></SimpleTable>
          </Scroll>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
});

export default MemberList;
