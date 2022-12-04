import AppHeader from '../../components/AppHeader/AppHeader';
import WeatherItems from '../../components/Weathers/Weathers';
import Footer from '../../components/Footer/Footer';

import './MainPage.scss';
import Form from '../../components/Form/Form';

const MainPage = () => {
  return (
    <>
      <AppHeader />
      <main className="main pt-10">
        <div className="container">
            <Form/>
          <div className="main__inner bg rounded-md">
            <WeatherItems />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;