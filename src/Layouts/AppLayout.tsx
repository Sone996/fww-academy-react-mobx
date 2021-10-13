import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Route, Switch, useHistory } from "react-router";
import logo from "../assets/images/factoryww.png";
import { TOKEN_LS_NAME } from "../constants/Constants";
import { RootStore } from "../store";

const AppLayout: FC = observer(() => {
  const { appStore, authStore } = RootStore(); // for modal state and active user
  const history = useHistory();

  //   console.log(authStore.loggedUser)

  const goHome = () => {
    if (authStore.loggedUser?.role === "teacher") {
      history.push("/teacher-home");
    } else {
      history.push("/student-home");
    }
  };
  const goProfile = () => {
    // personService
    //   .goProfile(loggedUser?.id)
    //   .then((res) => {
    //     dispatch({
    //       type: ActionTypes.SET_PROFILE_DATA,
    //       payload: res.data,
    //     });
    //     history.push({ pathname: `/profile/${res.data.id}` });
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.errors);
    //   });
  };
  const myStudents = () => {
    history.push("/member-list");
  };
  const newCourseHandler = () => {
    history.push("/new-course");
  };
  const CourseListHandler = () => {
    history.push("/course-list");
  };
  const studentAplicationsHandler = () => {
    history.push("/student-aplications");
  };
  const logout = () => {
    authStore
      .logoutAction()
      .then(() => {
        localStorage.removeItem(TOKEN_LS_NAME);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div className="flex p-16">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer"
            onClick={goHome}
          />
        </div>
        <div className="flex flex-col text-white font-bold text-lg">
          <span className="my-2 cursor-pointer" onClick={goHome}>
            Home
          </span>
          <span className="my-2 cursor-pointer" onClick={goProfile}>
            Profile
          </span>
          {authStore.loggedUser?.role === "teacher" ? (
            <>
              <span className="my-2 cursor-pointer" onClick={myStudents}>
                My Students
              </span>
              <span className="my-2 cursor-pointer" onClick={newCourseHandler}>
                {" "}
                New Course
              </span>
              <span className="my-2 cursor-pointer" onClick={CourseListHandler}>
                {" "}
                Course List
              </span>
              <span
                className="my-2 cursor-pointer"
                onClick={studentAplicationsHandler}
              >
                {" "}
                Student aplications
              </span>
            </>
          ) : (
            <></>
          )}
          <span className="my-2 cursor-pointer" onClick={logout}>
            {" "}
            Logout
          </span>
        </div>
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
