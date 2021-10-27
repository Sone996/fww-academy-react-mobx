import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { RootStore } from "../../store";
// import { courseService } from "../../Modules/CourseModule/Course.service";
// import { notificationMsg } from "../../Services/BaseService";
// import { successMsg, errorMsg } from "../../Services/MessageDisplayHandler";
import { ISingleCourse } from "../../types/types";

const SingleCourseStudentComponent: FC<{ data: ISingleCourse }> = observer(
  ({ data }) => {
    const { courseStore } = RootStore();
    const [form, setForm] = useState({
      id: data.id,
      comment: "",
    });

    const commentHandler = (
      event:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>
    ) => {
      setForm({
        ...form,
        comment: event.target.value,
      });
    };

    const buyCourse = () => {
      courseStore
        .buyCourse(form)
        .then((res) => {
          setForm({
            id: data.id,
            comment: "",
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data.errors);
        });
    };

    return (
      <div className="course flex w-full">
        <div className="course-data flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
          <div className="flex flex-col w-full items-start">
            <span data-cy="courseName">Name: {data.name}</span>
            <span data-cy="coursePrice">Price: {data.price}</span>
          </div>
          <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
            <span data-cy="courseDescription">
              {data.description ? data.description : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="single-course-component flex flex-col text-xl w-full">
            <div className="felx flex-col justify-between px-6">
              <div className="flex py-10">
                <textarea
                  v-model="form.comment"
                  value={form.comment}
                  onChange={commentHandler}
                  data-cy="buyCourseComment"
                  className="border resize-none w-full rounded p-3"
                  placeholder="Message for professor"
                />
              </div>
              <div className="flex">
                <span className="button bg-darkGreen" onClick={buyCourse}>
                  BUY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SingleCourseStudentComponent;
