export default interface IComplaintProps {
  id: number;
  complaint: string;
  category: string;
  description: string;
  status: string;
  solution?: string;
}
