import { MainLayout } from "./components/layout/MainLayout";
import { Toaster } from "./components/ui/toaster";
import "./i18n";

function App() {
  return (
    <>
      <MainLayout />
      <Toaster />
    </>
  );
}

export default App;
