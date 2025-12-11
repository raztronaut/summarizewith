import Hero from "@/components/ui/neural-network-hero";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Hero
        title="Where algorithms become art."
        description="A minimal hero with a neural canvas — crisp, elegant, and quietly expressive. Built with React, Three.js, and a custom CPPN shader."
        badgeText="Generative Surfaces"
        badgeLabel="New"
        ctaButtons={[
          { text: "Get started", href: "#get-started", primary: true },
          { text: "View showcase", href: "#showcase" }
        ]}
        microDetails={["Low‑weight font", "Tight tracking", "Subtle motion"]}
      >
        <script src="http://localhost:8080/dist/summarize-widget.iife.js" defer></script>
        <summarize-with-ai
          theme="default"
          services="chatgpt,gemini,claude,perplexity"
        ></summarize-with-ai>
      </Hero>
    </div>
  );
}
