const STEPS = [
    { num: "1", title: "Analizamos", color: "#22d3b8" },
    { num: "2", title: "Diseñamos", color: "#ffb020" },
    { num: "3", title: "Desarrollamos", color: "#22d3b8" },
    { num: "4", title: "Implementamos", color: "#ffb020" },
    { num: "5", title: "Acompañamos", color: "#22d3b8" },
] as const;

export default function ProcessTimeline() {
    return (
        <section className="bg-[#0a0e1a] px-6 py-16 md:px-10 md:py-20">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-1 text-center text-2xl font-extrabold text-white md:text-3xl">
                    Nuestra forma de trabajar
                </h2>
                <p className="mb-14 text-center text-sm text-[#8b93b8]">
                    Una línea de tiempo.
                </p>

                {/* --- Versión mobile: vertical, con la línea a la izquierda --- */}
                <div className="flex flex-col md:hidden">
                    {STEPS.map((step, i) => (
                        <div key={step.num} className="relative flex gap-4 pb-8 last:pb-0">
                            {i < STEPS.length - 1 && (
                                <div className="absolute left-[17px] top-9 h-[calc(100%-8px)] w-0.5 bg-[#232b45]" />
                            )}
                            <div
                                className="z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 bg-[#0a0e1a] font-extrabold"
                                style={{ borderColor: step.color, color: step.color }}
                            >
                                {step.num}
                            </div>
                            <div className="pt-1.5 text-[15px] font-bold text-white">
                                {step.title}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Versión desktop: horizontal, con la línea arriba --- */}
                <div className="relative hidden md:flex md:justify-between">
                    <div className="absolute left-[8%] right-[8%] top-[19px] h-0.5 bg-[#232b45]" />
                    {STEPS.map((step) => (
                        <div
                            key={step.num}
                            className="relative z-10 flex w-[18%] flex-col items-center text-center"
                        >
                            <div
                                className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#0a0e1a] font-extrabold"
                                style={{ borderColor: step.color, color: step.color }}
                            >
                                {step.num}
                            </div>
                            <div className="text-sm font-bold text-white">{step.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}