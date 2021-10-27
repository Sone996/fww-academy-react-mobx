import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { RootStore } from "../../store";
import { ILogin } from "../../types/types";

const loginFormDefault: ILogin = {
  email: "",
  password: "",
};

const LoginComponent: FC<{ toggle: () => void }> = ({ toggle }) => {
  const { authStore } = RootStore();
  const [form, setForm] = useState(loginFormDefault);
  const history = useHistory();

  const inputLoginHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginSubmit = async () => {
    authStore
      .loginAction(form)
      .then((res) => {
        if (res?.data.role === "teacher") {
          history.push("/teacher-home");
        } else {
          history.push("/student-home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col w-4/12 border h-2/3 p-4">
      <div className="flex justify-center">
        <span className="text-3xl">Login</span>
      </div>
      <div className="flex flex-col justify-center mt-8">
        <span>Email</span>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={inputLoginHandler}
        />
      </div>
      <div className="flex flex-col justify-center mt-4">
        <span>Password</span>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={inputLoginHandler}
        />
      </div>
      <div className="flex mt-4 justify-between">
        <div className="button bg-blue-500 w-1/3" onClick={loginSubmit}>
          Login
        </div>
        <div className="button bg-darkGreen w-1/3" onClick={() => toggle()}>
          Register
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
