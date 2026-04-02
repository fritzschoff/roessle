import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">
        Datenschutzerklärung
      </h1>
      <div className="prose prose-lg max-w-none">
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
          Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
          identifiziert werden können. Ausführliche Informationen zum Thema
          Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
          Datenschutzerklärung.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>
            Wer ist verantwortlich für die Datenerfassung auf dieser Website?
          </strong>
        </p>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis
          zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
        </p>

        <h2>2. Hosting</h2>
        <p>
          Wir hosten unsere Website bei <strong>Vercel Inc.</strong>, 340 S Lemon
          Ave #4133, Walnut, CA 91789, USA. Vercel ist ein Cloud-Plattform-Dienst,
          der es ermöglicht, Websites bereitzustellen. Wenn Sie unsere Website
          besuchen, werden von Vercel automatisch verschiedene Logdateien
          inklusive Ihrer IP-Adressen gespeichert. Weitere Informationen
          entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://vercel.com/legal/privacy-policy
          </a>
          .
        </p>
        <p>
          Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
          f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst
          zuverlässigen Darstellung unserer Website.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
          sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
          entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
          Datenschutzerklärung.
        </p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website
          ist:
        </p>
        <p>
          Cannstatter Kurve Berlin e.V.
          <br />
          Braunschweiger Straße 51
          <br />
          12055 Berlin
          <br />
          E-Mail:{" "}
          <a href="mailto:kontakt@ckb08.de">kontakt@ckb08.de</a>
        </p>

        <h3>Speicherdauer</h3>
        <p>
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere
          Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
          uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
          berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
          Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir
          keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
          personenbezogenen Daten haben.
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>
        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
          Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
          Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
          Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
          Ihre Einwilligung weiter.
        </p>
        <p>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
          zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
          erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
          unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
          gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
          Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
          erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
          dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
          Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit
          für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
          bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
          Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>
        <p>
          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
          jederzeit an uns wenden.
        </p>
      </div>
    </div>
  );
}
