import CircuitBackground from "@/components/CircuitBackground";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CircuitBackground />
      {children}
    </>
  );
}
