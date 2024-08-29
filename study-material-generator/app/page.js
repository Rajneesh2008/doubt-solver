import Button from "./components/button/Button";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main className=" w-full flex min-h-screen flex-col items-center justify-between">
      <div className="absolute bottom-6 right-6 lg:bottom-20 lg:right-20">
        <Button route={"/chat-bot"} icons={"fas fa-robot fa-2x"} />
      </div>
    </main>
  );
}
