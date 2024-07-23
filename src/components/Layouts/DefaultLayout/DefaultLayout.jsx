
import { useSelector } from "react-redux";
import Sidebar from "../../Sidebar/Index";
import styles from "./DefaultLayout.module.scss"



const DefaultLayout = ({ children }) => {

  const isSidebarActive = useSelector((state) => state.theme.isSidebarActive)

  return (
  

          <div style={{position: "relative"}}  >
            

              {/* BEGIN SIDEBAR */}
                <Sidebar />
              {/* END SIDEBAR */}

             
              <div className={`${styles.container} ${isSidebarActive ? styles.isSidebarActive : ""}`}>{children}</div>

        
          </div>

  );
};

export default DefaultLayout;
