import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import { useToggle } from "../Contexts/ToggleContext.jsx";

export default function Auth() {
  const { isSignedUp, toggleView } = useToggle();
  return (
    <div>
      {isSignedUp ? (
        <SignIn toggleView={toggleView} />
      ) : (
        <SignUp toggleView={toggleView} />
      )}
    </div>
  );
}
