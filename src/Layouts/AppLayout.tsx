import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Route, Switch } from "react-router";
import Navigation from "../components/shared/Navigation";
import { RootStore } from "../store";
// PAGES
import TeacherHome from "../pages/Teacher/TeacherHome";
import StudentHome from "../pages/Student/StudentHome";
import SingleCourse from "../pages/Shared/SingleCourse";
import Profile from "../pages/Shared/Profile";
import CourseList from "../pages/Shared/CourseList";
import MemberList from "../pages/Teacher/MemberList";
import NewCourse from "../pages/Teacher/NewCourse";
import StudentAplications from "../pages/Teacher/StudentAplications";
// END :: PAGES
// MODALS
import FinishingCourseModal from "../components/modals/FinishingCourseModal";
import RequestAcceptModal from "../components/modals/RequestAcceptModal";
import RateModal from "../components/modals/RateModal";
// END :: MODALS

const AppLayout: FC = observer(() => {
  const { appStore, authStore } = RootStore(); // for modal state and active user

  // modal logic
  const modalSwitch = (prop: string) => {
    switch (prop) {
      case "finishing-course-modal":
        return <FinishingCourseModal />;
      case "requrest-accept-modal":
        return <RequestAcceptModal />;
      case "rate-course":
        return <RateModal />;
      default:
        break;
    }
  };
  // END :: modal logic
  return (
    <div className="flex w-full h-full">
      {/* MODALS */}
      {appStore.getModal.status ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex modal">
          <div className="modal-overlay fixed top-0 left-0 modal-overlay h-screen w-screen flex"></div>
          <div className="modal flex items-center justify-center w-full">
            {modalSwitch(appStore.getModal.name)}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* END :: MODALS */}
      <div className="flex flex-col h-full bg-gray-500 w-2/12 items-center">
        <Navigation></Navigation>
      </div>
      <div className="flex w-full">
        <Switch>
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
        </Switch>
      </div>
    </div>
  );
});

export default AppLayout;
