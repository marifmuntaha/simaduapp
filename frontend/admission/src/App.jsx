import AllRoutes from "./route/Routes";

import ThemeProvider from "./layout/provider/Theme";
import InstitutionProvider from "./layout/provider/Institution";

const App = () => {
    return (
        <ThemeProvider>
            <InstitutionProvider>
                <AllRoutes/>
            </InstitutionProvider>
        </ThemeProvider>
    );
};
export default App;