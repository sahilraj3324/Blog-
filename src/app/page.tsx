import Image from "next/image";
import Homepage from "./home/Homepage";
import { Dashboard } from "./edit/NewBlog";
import { Update } from "./edit/Update";
import Create from "./edit/Create";


export default function Home() {
  return (
    <div>
      <Homepage/>
      <Dashboard />
      
      
      
      
    </div>
  );
}
