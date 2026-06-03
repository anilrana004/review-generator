import { Toaster } from "@/components/ui/sonner";
import { Layout } from "./components/Layout";
import { ReviewGeneratorPage } from "./pages/ReviewGeneratorPage";

export default function App() {
  return (
    <>
      <Layout>
        <ReviewGeneratorPage />
      </Layout>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
