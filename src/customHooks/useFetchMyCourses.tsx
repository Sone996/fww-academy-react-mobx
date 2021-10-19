import { useEffect, useState } from "react";
import { RootStore } from "../store";

export default function useFetchMyCourses() {
  const { personStore, authStore } = RootStore();
  const [myCourses, setMyCourses] = useState(null);

  useEffect(() => {
    personStore
      .fetchMyCourses(authStore.loggedUser.id)
      .then((res) => {
        setMyCourses(res);
      })
      .catch((err) => {
        setMyCourses(err);
      });
  }, [authStore.loggedUser.id, personStore]);

  return myCourses;
}
