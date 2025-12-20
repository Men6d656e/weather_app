import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import Dashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            {/* <Route path="/" element={<Dashboard/>} /> */}
            {/* <Route path="/city/:cityName" element={<CityPage/>} /> */}
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
