import { signOut, signIn, useSession } from "next-auth/client";
import { withDefautLayout } from "../layouts/Default";

function Home() {
  return <div>home</div>;
}

export default withDefautLayout(Home);
