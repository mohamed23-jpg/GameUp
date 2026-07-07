import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import NotFound from './pages/not-found';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="gameup-theme">
        <WouterRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
