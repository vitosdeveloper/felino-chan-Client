import HomePage from '@/app/components/pages/home/Home';
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';

export default function Home() {
  return (
    <>
      <Header />
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  );
}
