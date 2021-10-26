import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import Scroll from "../../components/shared/Scroll";
import SimpleTable from "../../components/shared/SimpleTable";
import { RootStore } from "../../store";

const parseAplication = (val: any) => {
  let result: any = [];
  val.forEach((aplication: {}, i: number) => {
    let ap = {
      student_id: val[i].student_id,
      course_id: val[i].course_id,
      accepted: val[i].accepted,
    };
    result.push(ap);
  });
  return result;
};

const StudentAplications: FC = observer(() => {
  const { personStore } = RootStore();
  const [model, setModel] = useState([]);
  const titles = ["Student Id", "Course Id", "Accept"];

  useEffect(() => {
    personStore.fetchAplicationRequests();
  }, [personStore]);

  const getActive = () => {
    let active = personStore.getStudentAplications;
    active = active.filter((ac: { accepted: boolean }) => ac.accepted === true);
    setModel(parseAplication(active));
  };

  const getInactive = () => {
    let inactive = personStore.getStudentAplications;
    inactive = inactive.filter(
      (inac: { accepted: boolean }) => inac.accepted === false
    );
    setModel(parseAplication(inactive));
  };

  const singleView = (item: any) => {
    if (item.accepted === true) {
      console.log("accepted");
      //   dispatch({
      //     type: ActionTypes.SET_MODAL,
      //     payload: {
      //       name: "finishing-course-modal",
      //       status: true,
      //       data: item,
      //     },
      //   });
    } else {
      console.log("not accepted");
      //   dispatch({
      //     type: ActionTypes.SET_MODAL,
      //     payload: {
      //       name: "requrest-accept-modal",
      //       status: true,
      //       data: item,
      //     },
      //   });
    }
  };

  return (
    <div className="student-aplications flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>Students</span>
      </div>
      <div className="flex w-full mt-4">
        <span className="button bg-darkGreen ml-4" onClick={getActive}>
          Active
        </span>
        <span className="button bg-darkGreen ml-4" onClick={getInactive}>
          Inactive
        </span>
      </div>

      <div className="flex flex-col justify-center h-full p-16">
        <div className="relative h-full w-full">
          <Scroll>
            <SimpleTable
              singleView={singleView}
              model={model}
              titles={titles}
            ></SimpleTable>
          </Scroll>
        </div>
      </div>
    </div>
  );
});

export default StudentAplications;
