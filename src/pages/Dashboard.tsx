<<<<<<< HEAD
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
=======
import Heading from '@common/Heading/Heading';
import { Container } from 'react-bootstrap';


const Dashboard = () => {
  return (
    <Container>
      <Heading title='Dashboard' description='view Dashbord'></Heading>
    </Container>
>>>>>>> main
  );
};

export default Dashboard;
