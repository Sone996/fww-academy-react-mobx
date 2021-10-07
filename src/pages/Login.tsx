import { FC, useState } from "react";
import LoginComponent from "../components/loginRegisterComponents/LoginComponent";
import RegisterComponent from "../components/loginRegisterComponents/RegisterComponent";

const Login: FC = () => {
  const [register, setRegister] = useState(false);

  const toggleForm = (): void => {
    setRegister(!register);
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      {!register ? (
        <LoginComponent toggle={toggleForm}></LoginComponent>
      ) : (
        <RegisterComponent toggle={toggleForm}></RegisterComponent>
      )}
    </div>
  );
};

export default Login;
