export default interface IComplaintProps {
  _id: string;
  name: string;
  student?: object;
  category: string;
  description: string;
  status: string;
  solution: string;
}
