import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
const Dashboard = () => {
  return (
    <Sidebar>
      <Header />
      <div className="main-container text-center">
        <h1>دشبورد</h1>
      </div>
      <Footer />
    </Sidebar>
  );
};

export default Dashboard;
