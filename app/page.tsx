// app/page.tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Profile } from "@/components/profile";
import { Motto } from "@/components/motto";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Header />

      {/* 🔥 Hero 섹션 추가 */}
      <Hero />

      <Profile />
      <Motto />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}