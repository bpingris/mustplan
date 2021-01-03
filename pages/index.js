import { withDefautLayout } from "../layouts/Default";
import styles from './index.module.css'

function Home() {

  return (
    <div>
      <p className="text-3xl font-medium">
        Organisez vos projets simplement et rapidement
      </p>
      <div className={`p-10 ${styles.float}`}>
        <img
          className="shadow-lg rounded-md"
          src="/mustplan_illustration.png"
        />
      </div>
    </div>
  );
}

export default withDefautLayout(Home);
