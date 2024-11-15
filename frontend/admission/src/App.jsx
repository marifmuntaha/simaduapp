import AllRoutes from "./route/Routes";

import ThemeProvider from "./layout/provider/Theme";
import InstitutionProvider from "./layout/provider/Institution";
import SettingProvider from "./layout/provider/Setting";

const App = () => {
    return (
        <ThemeProvider>
            <InstitutionProvider>
                <SettingProvider>
                    <AllRoutes/>
                </SettingProvider>
            </InstitutionProvider>
        </ThemeProvider>
    );
};
export default App;