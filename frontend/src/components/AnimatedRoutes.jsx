import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from "../pages/Home";
import About from "../pages/About";
import Work from "../pages/Work";
import ProjectDetailed from "../pages/ProjectDetailed";
import Services from "../pages/Services";
import Careers from "../pages/Careers";
import JobDetailed from "../pages/JobDetailed";
import Journal from "../pages/Journal";
import JournalDetailed from "../pages/JournalDetailed";
import Contact from "../pages/Contact";
import StartProject from "../pages/StartProject";
import Application from "../pages/Application";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import PageTransition from "./PageTransition";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><About /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/work/:projectId" element={<PageTransition><ProjectDetailed /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/careers/:role" element={<PageTransition><JobDetailed /></PageTransition>} />
        <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
        <Route path="/journal/:articleId" element={<PageTransition><JournalDetailed /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/start-project" element={<PageTransition><StartProject /></PageTransition>} />
        <Route path="/application" element={<PageTransition><Application /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
