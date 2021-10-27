import "../../App.scss";
import { FC, useEffect, useState } from "react";
import { IRequestAcceptForm } from "../../types/types";
import { RootStore } from "../../store";

const RequestAcceptModal: FC = () => {
  const { appStore, personStore } = RootStore();

  const [form, setForm] = useState<IRequestAcceptForm>({
    course_id: appStore.getModal.data.course_id,
    accepted: null,
  });

  const resolvingAplication = (status: any) => {
    setForm({
      ...form,
      accepted: status,
    });
  };

  useEffect(() => {
    if (form.accepted != null) {
      personStore
        .resolveRequest(form)
        .then((res) => {
          console.log(res);
          personStore
            .fetchAplicationRequests()
            .then(() => {
              appStore.closeModal();
            })
            .catch((err) => {
              console.log(err.response.data.errors);
            });
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          appStore.closeModal();
        });
    }
  }, [form.accepted, personStore, form, appStore]);

  return (
    <div
      id="requrest-accept-modal"
      className="requrest-accept-modal h-1/6 rounded-lg w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center"
    >
      <div className="flex items-center justify-between w-full px-8">
        <span
          onClick={() => resolvingAplication(false)}
          className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer"
        >
          Reject
        </span>
        <span
          onClick={() => resolvingAplication(true)}
          className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer"
        >
          Accept
        </span>
      </div>
    </div>
  );
};

export default RequestAcceptModal;
