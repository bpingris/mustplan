import { signOut, useSession } from "next-auth/client";
import Projects from "../components/Profile/Projects";
import Button from "../components/UI/Button";
import { withDefautLayout } from "../layouts/Default";

export default withDefautLayout(() => {
  const [session, loading] = useSession();
  return (
    <>
      {session && (
        <div className="p-5 mx-auto bg-white rounded shadow sm:w-2/3 md:w-1/2 lg:w-1/3">
          <h1 className="text-2xl ">Profile</h1>
          <div className="flex justify-center my-3">
            <img
              className="w-20 h-20 transition-transform transform rounded-full shadow-md hover:scale-105"
              src={session.user.image}
            />
          </div>
          <div className="text-lg text-center jmb-4">
            Bonjour <span className="font-bold">{session.user.name}</span> !
          </div>
          <Projects />
          <Button kind="danger" onClick={signOut}>
            Deconnexion
          </Button>
        </div>
      )}
    </>
  );
});
