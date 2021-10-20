import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { RootStore } from "../../store";
import { INewCourse } from "../../types/types";

const formInterface = {
  name: "",
  price: "",
  description: "",
};

const NewCourse: FC = observer(() => {
  const { courseStore } = RootStore();
  const [form, setForm] = useState<INewCourse>(formInterface);

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const createCourse = () => {
    courseStore
      .createCourse(form)
      .then((res) => {
        setForm(formInterface);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="new-course flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>New Course</span>
      </div>
      <div className="flex flex-col w-1/2 px-16">
        <div className="flex flex-col mt-8 w-1/2">
          <span>Name</span>
          <input
            className="input"
            type="text"
            autoComplete="off"
            value={form?.name}
            name="name"
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col mt-8 w-1/2">
          <span>Price</span>
          <input
            className="input"
            type="number"
            autoComplete="off"
            value={form?.price}
            name="price"
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col mt-8">
          <textarea
            value={form?.description}
            onChange={inputHandler}
            className="border resize-none w-full rounded p-3"
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="flex mt-8 w-1/4">
          <div onClick={createCourse} className="button bg-blue-500">
            Create
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewCourse;
