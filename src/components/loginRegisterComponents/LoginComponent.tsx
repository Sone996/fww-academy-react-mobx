import { FC, useState } from "react";
// import { LoginHook } from "../CustomHooks/LoginHook";
import { ILogin } from "../../types/types";

const loginFormDefault: ILogin = {
  email: "",
  password: "",
};

const LoginComponent: FC<{ toggle: () => void }> = ({ toggle }) => {
  const [form, setForm] = useState(loginFormDefault);
  //   const useLogin = LoginHook();

  const inputLoginHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginSubmit = async () => {
    // useLogin.mutate(form);
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
