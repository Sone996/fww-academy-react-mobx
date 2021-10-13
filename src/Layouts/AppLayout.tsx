import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Route, Switch, useHistory } from "react-router";
import Navigation from "../components/shared/Navigation";
import { RootStore } from "../store";

const AppLayout: FC = observer(() => {
  const { appStore } = RootStore(); // for modal state and active user

  // modal logic
  //   const modalSwitch = (prop: string) => {
  //     switch (prop) {
  //       case "finishing-course-modal":
  //         return <FinishingCourseModal />;
  //       case "requrest-accept-modal":
  //         return <RequestAcceptModal />;
  //       case "rate-course":
  //         return <RateCourse />;
  //       default:
  //         break;
  //     }
  //   };
  // END :: modal logic
  return (
    <div className="flex w-full h-full">
      {/* MODALS */}
      {/* {contextState.modal.status ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex modal">
          <div className="modal-overlay fixed top-0 left-0 modal-overlay h-screen w-screen flex"></div>
          <div className="modal flex items-center justify-center w-full">
            {modalSwitch(contextState.modal.name)}
          </div>
        </div>
      ) : (
        <></>
      )} */}
      {/* END :: MODALS */}
      <div className="flex flex-col h-full bg-gray-500 w-2/12 items-center">
        <Navigation></Navigation>
      </div>
      <div className="flex w-full">
        {/* <Switch>
          {authStore.loggedUser?.role === "teacher" ? (
            <Route path="/teacher-home" component={TeacherHome} />
          ) : (
            <Route path="/student-home" component={StudentHome} />
          )}
          <Route path="/profile/:id" component={Profile} />
          <Route path="/member-list" component={MemberList} />
          <Route path="/new-course" component={NewCourse} />
          <Route path="/course-list" component={CourseList} />
          <Route path="/single-course/:id" component={SingleCourse} />
          <Route path="/student-aplications" component={StudentAplications} />
        </Switch> */}
      </div>
    </div>
  );
});

export default AppLayout;
