import CodeRainBackground from "@/components/CodeRainBackground";

export default function AgenteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CodeRainBackground />
      {children}
    </>
  );
}
