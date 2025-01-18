import { useState } from "react";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { AlertCircle, Check, Copy } from "lucide-react";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const content = document.getElementById("content");

    setError("");

    if (!content.value.trim()) {
      setError("Please enter your request before sending.");
      return;
    }

    setIsLoading(true);
    try {
      const ai = await requestToGroqAI(content.value);
      setData(ai);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setIsCopied(true);
      setShowCopyFeedback(true);

      setTimeout(() => {
        setIsCopied(false);
        setShowCopyFeedback(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            COGNITIVE AI
          </h1>
          <p className="text-gray-400">
            Powerful AI assistance powered by GROQ
          </p>
        </header>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700">
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm text-gray-300">
                Your Request
              </label>
              <input
                className={`w-full py-3 px-4 text-md rounded-lg bg-gray-700/50 text-white placeholder-gray-400 
                         border ${
                           error ? "border-red-500" : "border-gray-600"
                         } focus:outline-none focus:ring-2 focus:ring-orange-500 
                         focus:border-transparent transition duration-200`}
                placeholder="Send a message to Cognitive ai..."
                id="content"
                type="text"
                onChange={() => error && setError("")}
              />
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <button
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 py-3 px-6 font-semibold 
                       text-white rounded-lg hover:from-orange-700 hover:to-red-700 
                       transform hover:scale-[1.02] transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "Send Request"
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-300">Output</span>
            {data && (
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors py-1 px-2 rounded"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {isCopied ? "Copied!" : "Copy to clipboard"}
                </button>
                {showCopyFeedback && (
                  <div className="absolute bottom-full right-0 mb-2 bg-green-500 text-white text-xs py-1 px-2 rounded shadow-lg">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-4">
            <SyntaxHighlight
              language="javascript"
              style={darcula}
              wrapLongLines={true}
              customStyle={{
                background: "transparent",
                padding: "1rem",
                margin: 0,
                borderRadius: "0.5rem",
              }}
            >
              {data || "/* Output will appear here */"}
            </SyntaxHighlight>
          </div>
        </div>
      </div>
      <footer className="text-center text-gray-400 text-[6px] mt-8">
        &copy; {new Date().getFullYear()} Ignatius Farel. All rights reserved.
      </footer>
    </main>
  );
}

export default App;
