import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
const Dashboard = () => {
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));

  const FettchAmiryatData = () => {
    if (userData.UserType === "directorate") {
      axios
        .post("/api/user/amiryatdata", {
          data: {
            userId: userData.UserId,
          },
        })
        .then((res) => {
          const amiryatData = jwtDecode(res.data.AmiryatToken);
          localStorage.setItem("amiryatToken", JSON.stringify(amiryatData));
          console.log("response is: ", amiryatData);
        })
        .catch((err) => {
          console.log("Axios Request Error After Calling API", err.response);
        });
    }
  };

  useEffect(() => {
    FettchAmiryatData();
  }, []);

  return (
    <Sidebar>
      <Header />

      <div className="main-container text-center">
        {userData.UserType === "admin" && <h1>اډمین</h1>}
        {userData.UserType === "presidency" && (
          <h1>معاونیت/ ریاست / آمریت مستقل</h1>
        )}
        {userData.UserType === "directorate" && <h1>آمریت</h1>}
        <h1>دشبورد</h1>

        <div>
          <label htmlFor="currentReciver">مکتوب نمبر</label>
          <p>12</p>
        </div>
        <div>
          <label htmlFor="currentReciver">موقعیت </label>
          <p>Nisaab</p>
        </div>
      </div>
      <Footer />
    </Sidebar>
  );
};

export default Dashboard;
