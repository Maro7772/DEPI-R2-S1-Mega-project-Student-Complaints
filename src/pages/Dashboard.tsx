import Heading from "@common/Heading/Heading";
import AdminDashboard from "@/common/DashBoard/Admin/Dashboard";
import StudentDashboard from "@/common/DashBoard/Student/StudentDashboard";

const Dashboard = () => {
  return (
    <div>
      <Heading title="Dashboard" description="view Dashbord">
      </Heading>
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;
