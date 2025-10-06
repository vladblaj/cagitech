import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { SEOHead } from "../components/SEOHead";
import { ArrowLeft, Home, Zap, AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-eerie-black">
      <SEOHead
        title="Page Not Found - Bitlads Software"
        description="The page you're looking for doesn't exist. Return to our workflow automation solutions."
        keywords="404, page not found, error"
      />

      {/* Header */}
      <header className="border-b border-jet">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-jonquil rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-eerie-black" />
              </div>
              <span className="text-xl font-bold font-mono text-timberwolf">
                Bitlads Software
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button
                variant="outline"
                className="font-mono font-semibold border-2 border-jonquil bg-eerie-black text-timberwolf hover:bg-jonquil hover:text-eerie-black hover:border-aureolin transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-aureolin/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-aureolin" />
            </div>
          </div>

          {/* 404 Header */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-aureolin font-mono">
            404
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-timberwolf">
            Page Not Found
          </h2>

          <p className="text-lg text-timberwolf font-mono mb-8 max-w-2xl mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have automated itself out
            of existence. Don't worry though - our workflow automation is much
            more reliable than our URL routing.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/">
              <Button
                size="lg"
                className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono text-lg px-6 py-3 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="font-mono font-semibold border-2 border-timberwolf text-timberwolf hover:bg-timberwolf hover:text-eerie-black transition-all duration-200"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-jet/50 rounded-xl p-8 border border-jet">
            <h3 className="text-xl font-bold text-timberwolf mb-4 font-mono">
              You might be looking for:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <Link
                to="/"
                className="block p-4 bg-eerie-black border border-jet rounded-lg hover:border-jonquil transition-colors group"
              >
                <h4 className="font-mono font-semibold text-timberwolf group-hover:text-aureolin transition-colors">
                  Workflow Solutions
                </h4>
                <p className="text-sm text-timberwolf opacity-75 font-mono">
                  Explore our automation services
                </p>
              </Link>

              <Link
                to="/contact"
                className="block p-4 bg-eerie-black border border-jet rounded-lg hover:border-jonquil transition-colors group"
              >
                <h4 className="font-mono font-semibold text-timberwolf group-hover:text-aureolin transition-colors">
                  Get In Touch
                </h4>
                <p className="text-sm text-timberwolf opacity-75 font-mono">
                  Start your automation journey
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-jet bg-jet mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-6 bg-jonquil rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-eerie-black" />
            </div>
            <span className="text-lg font-bold font-mono text-timberwolf">
              Bitlads Software
            </span>
          </div>
          <p className="text-timberwolf font-mono text-sm">
            © 2025 Bagawhey Solutions S.R.L.
          </p>
        </div>
      </footer>
    </div>
  );
}
