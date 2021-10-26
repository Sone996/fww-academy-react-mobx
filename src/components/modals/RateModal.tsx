import { FC, useState } from "react";
import { RootStore } from "../../store";

const RateModal: FC = () => {
  const { authStore, appStore, personStore } = RootStore();
  const [form, setForm] = useState({
    comment: "",
    mark: "",
    personId: authStore.loggedUser?.id,
  });

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const cancel = () => {
    appStore.closeModal();
  };

  const completeCourse = () => {
    personStore
      .completeCourse(form)
      .then((res) => {
        console.log(res);
        cancel();
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        cancel();
      });
  };

  return (
    <div
      id="rate-course-modal"
      className="rate-course-modal rounded-lg w-4/12 h-3/12 bg-gray-400 flex flex-col absolute text-tiny felx items-center justify-center"
    >
      <div className="flex items-center justify-center w-full px-8 py-4">
        <span className="font-bold text-xl text-white">Rate Course</span>
      </div>
      <div className="flex flex-col w-full p-4 pt-0">
        <textarea
          value={form.comment}
          onChange={inputHandler}
          name="comment"
          className="border resize-none w-full rounded p-3"
          placeholder="Your ocmment"
        />
        <div className="flex w-full p-4 pl-0 items-center">
          <span className="flex font-bold text-white mr-4">Rate here:</span>
          <input
            value={form.mark}
            onChange={inputHandler}
            name="mark"
            className="input"
            type="text"
            placeholder="1-5"
          />
        </div>
        <div className="flex items-center justify-between w-full px-8">
          <span
            onClick={cancel}
            className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer text-white"
          >
            Cancel
          </span>
          <span
            onClick={completeCourse}
            className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer text-white"
          >
            Send
          </span>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
