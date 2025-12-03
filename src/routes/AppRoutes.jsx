import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout.jsx';

import Home from '@pages/Home.jsx';
import ConhecaIslam from '@pages/ConhecaIslam.jsx';
import ProfetaMuhammad from '@pages/ProfetaMuhammad.jsx';
import MulherNoIslam from '@pages/MulherNoIslam.jsx';
import JesusNoIslam from '@pages/JesusNoIslam.jsx';
import HadithEtica from '@pages/HadithEtica.jsx';
import SobreCCIB from '@pages/SobreCCIB.jsx';
import NoticiasEventos from '@pages/NoticiasEventos.jsx';
import Contato from '@pages/Contato.jsx';
import AdminDashboard from '@pages/AdminDashboard.jsx';
import Login from '@pages/Login.jsx';
import UserProfile from '@pages/UserProfile.jsx';
import LiteraturaIslamica from '@pages/LiteraturaIslamica.jsx';
import AlcoraoAudio from '@pages/AlcoraoAudio.jsx';
import AlcoraoLeitura from '@pages/AlcoraoLeitura.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/conheca-o-islam" element={<ConhecaIslam />} />
        <Route path="/profeta-muhammad" element={<ProfetaMuhammad />} />
        <Route path="/mulher-no-islam" element={<MulherNoIslam />} />
        <Route path="/jesus-no-islam" element={<JesusNoIslam />} />
        <Route path="/hadith-e-etica" element={<HadithEtica />} />

        {/* Biblioteca CCIB */}
        <Route path="/literatura-islamica" element={<LiteraturaIslamica />} />
        <Route path="/alcorao-audio" element={<AlcoraoAudio />} />
        <Route path="/alcorao-leitura" element={<AlcoraoLeitura />} />

        <Route path="/sobre-ccib" element={<SobreCCIB />} />
        <Route path="/noticias-e-eventos" element={<NoticiasEventos />} />
        <Route path="/contato" element={<Contato />} />

        {/* Acesso restrito / área do usuário */}
        <Route path="/acesso-restrito" element={<Login />} />
        <Route path="/minha-conta" element={<UserProfile />} />

        {/* Área administrativa geral (se necessário) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <main className="ccib-page">
              <div className="ccib-container" style={{ paddingTop: '2rem' }}>
                <h1>Página não encontrada</h1>
                <p>Verifique o endereço digitado ou utilize o menu de navegação.</p>
              </div>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
