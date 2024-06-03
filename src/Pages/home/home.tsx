import React, { FC } from 'react';
import Navbar from '../../Components/common/user/navbar/Navbar';
import Homebanner from '../../Components/user/home/Homebanner';
import Features from '../../Components/user/home/features';
import Newsletter from '../../Components/user/home/newsletter';
import Footer from '../../Components/common/user/footer/footer';

const home: FC = () => {
  return (
    <>
    <Navbar/>
    <Homebanner/>
    <Features/>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default home;