import { observer } from "mobx-react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { TOKEN_LS_NAME } from "../../constants/Constants";
import { RootStore } from "../../store";
import logo from "../../assets/images/factoryww.png";

const Navigation: FC = observer(() => {
  const { authStore } = RootStore(); // for modal state and active user
  const history = useHistory();

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
  return (
    <>
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
    </>
  );
});

export default Navigation;
