import React from 'react';
import { Routes, Route } from "react-router-dom";

import App from './App';
import GameDB from './gamedb/gamedb';

const Router = () => {
  return (
    <Routes>
      <Route path= "/" element = {<App/>} />
      <Route path= "/gamedb" element = {<GameDB/>} />
    </Routes>
  );
};

export default Router;