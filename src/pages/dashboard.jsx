import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
const Dashboard = () => {
  return (
    <Sidebar>
      <Header />
      <div className="main-container text-center">
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
