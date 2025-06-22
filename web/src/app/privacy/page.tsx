import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDuration: "12s" }}
      ></div>

      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight mb-8 border-b pb-4 border-secondary/20">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                Privacy Policy
              </span>
            </h1>

            <div className="space-y-8 text-muted-foreground">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Information We Collect
                </h2>
                <p>
                  OpenAlbion, maintained by the Albion College EECS Club,
                  collects information necessary to provide access to research
                  data. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Authentication information (Albion email address and
                    password)
                  </li>
                  <li>API usage statistics</li>
                  <li>Log data for security and troubleshooting purposes</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  How We Use Your Information
                </h2>
                <p>The information we collect is used to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Authenticate and authorize access to research data</li>
                  <li>Monitor API usage for fair use and capacity planning</li>
                  <li>Improve the platform and troubleshoot issues</li>
                  <li>Communicate important updates about the service</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Data Retention
                </h2>
                <p>
                  OpenAlbion retains user data for as long as necessary to
                  provide the service. Usage logs may be retained for up to 12
                  months for security, troubleshooting, and academic research
                  purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect user
                  information. API keys should be kept confidential and not
                  shared with others.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Updates to This Policy
                </h2>
                <p>
                  This privacy policy may be updated periodically as the EECS
                  Club continues to improve the platform. We will notify users
                  of significant changes by email or through the platform.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
