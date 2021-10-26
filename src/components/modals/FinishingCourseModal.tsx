import "../../App";
import { FC } from "react";
import { IFinishCourseForm } from "../../types/types";
import { RootStore } from "../../store";

const FinishingCourseModal: FC = () => {
  const { appStore, authStore, courseStore } = RootStore();

  const form: IFinishCourseForm = {
    complete: true,
    courseId: appStore.getModal.data.course_id,
    userId: appStore.getModal.data.student_id,
    teacherId: authStore.loggedUser?.id,
  };

  const cancel = () => {
    appStore.closeModal();
  };

  const completeCourse = () => {
    courseStore
      .completeCourse(form)
      .then(() => {
        console.log("success");
        cancel();
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        cancel();
      });
  };

  return (
    <div
      id="finishing-course-modal"
      className="course-course-modal rounded-lg w-4/12 xl:w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center"
    >
      <div className="flex items-center justify-between w-full px-8">
        <span
          onClick={cancel}
          className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer"
        >
          Cancel
        </span>
        <span
          onClick={completeCourse}
          className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer"
        >
          Complete
        </span>
      </div>
    </div>
  );
};

export default FinishingCourseModal;
