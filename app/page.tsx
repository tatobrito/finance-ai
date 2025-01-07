import Navbar from "./_components/navbar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return <Navbar />;
};

export default Home;
