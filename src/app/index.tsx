import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from 'widgets/dashboard';
import { CountryFilterRow } from '@/features/country-filter';
import { store } from './store';
import 'react-loading-skeleton/dist/skeleton.css';

export const Main = () => {
    return (
        <Provider store={store}>
            <Dashboard />
            <Toaster />
            <CountryFilterRow />
        </Provider>
    );
};
