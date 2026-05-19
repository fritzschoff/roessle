export default function HomePage() {
  return (
    <div className="bg-white flex flex-col h-full">
      <div className="flex-1 px-6 sm:px-10 lg:px-32 pt-16 sm:pt-20 pb-8">
        <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-1">
          Fern der Heimat, nah im Herzen
        </p>

        <h1 className="text-[34px] sm:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-black max-w-[90%] lg:max-w-lg">
          Cannstatter Kurve Berlin
        </h1>

        <p className="text-xs text-black mt-6 max-w-md leading-relaxed">
          Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
          <br />
          Wir freuen uns auf deinen Besuch!
        </p>
      </div>
    </div>
  );
}
