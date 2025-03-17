import AboutChallenge from "./components/AboutChallenge";
import Challenge from "./components/Challenge";
import Home from "./components/Home";
import Links from "./components/Links";

export default function Page() {
  return (
    <main className="scroll-smooth overflow-y-scroll scroll-hidden h-screen">
      <section id="/home"><Home   /></section>
      <section id="/challenge"><Challenge/></section>
      <section id="/aboutChallenge"><AboutChallenge/></section>
    </main>
  )
}