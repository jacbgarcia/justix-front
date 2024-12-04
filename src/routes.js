
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForunsList from "./pages/BDForuns/ForunsList";
import ForunsForm from "./pages/BDForuns/ForunsForm";
import React, { useState } from 'react';
import Forunsindex from "./pages/Foruns/Forunsindex";
import AdvocaciasList from "./pages/BDAdvocacias/AdvocaciasList";
import AdvocaciasForm from "./pages/BDAdvocacias/AdvocaciasForm";
import TribunaisList from './pages/BDTribunais/TribunaisList';
import TribunaisForm from './pages/BDTribunais/TribunaisForm';
import AudienciasList from './pages/BDAudiencias/AudienciasList';
import AudienciasForm from './pages/BDAudiencias/AudienciasForm';
import PortaisList from "./pages/BDPortais/PortaisList";
import  PortaisForm from "./pages/BDPortais/PortaisForm";
import MediacoesList from "./pages/BDMediacoes/MediacoesList";
import MediacoesForm from "./pages/BDMediacoes/MediacoesForm";
import UsuariosList from './pages/BDUsuarios/UsuariosList';
import UsuariosForm from './pages/BDUsuarios/UsuariosForm';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Tribunaisindex from "./pages/Tribunais/Tribunaisindex";
import Audienciasindex from "./pages/Audiencias/Audienciasindex"
import Mediacoesindex from "./pages/Mediacoes/Mediacoesindex";
import Advocaciaindex  from "./pages/Advocacias/Advocaciasindex";
import Portaisindex  from "./pages/Portais/Portaisindex";
import FeedTribunais from "./pages/Home/FTribunais/FeedTribunais";
import FeedForuns from "./pages/Home/FForuns/FeedForuns";
import FeedAudiencias from "./pages/Home/FAudiencias/FeedAudiencias";
import FeedMediacao from "./pages/Home/FMediacoes/FeedMediacao";
import FeedAdvocacias from "./pages/Home/FAdvocacias/FeedAdvocacias";
import FeedPortais from "./pages/Home/FPortais/FeedPortais";
import HomeUser from "./pages/HomeUser/HomeUser";
import UFeedTribunais from "./pages/HomeUser/UTribunais/UFeedTribunais";
import  UFeedForuns from "./pages/HomeUser/UForuns/UFeedForuns";
import  UFeedAudiencias from "./pages/HomeUser/UAudiencias/UFeedAudiencias";
import UFeedMediacao from "./pages/HomeUser/UMediacoes/UFeedMediacoes";
import UFeedAdvocacias from "./pages/HomeUser/UAdvocacias/UFeedAdvocacias";
import  UFeedPortais from "./pages/HomeUser/UPortais/UFeedPortais";
import FeedbackTribunalPai from "./pages/HomeUser/UTribunais/FeedbackTribunalPai";
import FeedbackForumPai from "./pages/HomeUser/UForuns/FeedbackForumPai";
import FeedbackAudienciaPai from  "./pages/HomeUser/UAudiencias/FeedbackAudienciaPai";
import FeedbackMediacoesPai from "./pages/HomeUser/UMediacoes/FeedbackMediacoesPai";
import  FeedbackAdvocaciaPai from "./pages/HomeUser/UAdvocacias/FeedbackAdvocaciaPai";
import FeedbackPortalPai from "./pages/HomeUser/UPortais/FeedbackPortalPai";
import TribunaisindexL from "./pages/Tribunais/TribunaisindexL";
import ForunsindexL from "./pages/Foruns/ForunsindexL";
import AudienciasindexL from "./pages/Audiencias/AudienciasindexL";
import MediacoesindexL from "./pages/Mediacoes/MediacoesindexL";
import AdvocaciasindexL from "./pages/Advocacias/AdvocaciasindexL";
import PortaisindexL from "./pages/Portais/PortaisindexL";

function App() {
  const [forumEditado, setForumEditado] = useState(null);
  const [tribunalEditado, setTribunalEditado] = useState(null);
  const [juizEditado, setJuizEditado] = useState(null);
  const [mediadorEditado, setMediadorEditado] = useState(null);
  const [advocaciaEditado, setAdvocaciaEditado] = useState(null);
  const [portaisEditado, setPortaisEditado] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  return (
    <BrowserRouter>
   
   
      <Routes>
        <Route path="/login"  element={<Login />}></Route>
        <Route path="/cadastro"   element={<Cadastro />}></Route>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/tribunais" element={ <Tribunaisindex/> }></Route>
        <Route path="/foruns" element={ <Forunsindex/> }></Route>
        <Route path="/juiz" element={ <Audienciasindex/> }></Route>
        <Route path="/mediacoes" element={ <Mediacoesindex/> }></Route>
        <Route path="/advocacia" element={ <Advocaciaindex/> }></Route>
        <Route path="/portais" element={ <Portaisindex/> }></Route>
        <Route path="/user/tribunais" element={ <TribunaisindexL/> }></Route>
        <Route path="/user/foruns" element={ <ForunsindexL/> }></Route>
        <Route path="/user/juiz" element={ <AudienciasindexL/> }></Route>
        <Route path="/user/mediacoes" element={ <MediacoesindexL/> }></Route>
        <Route path="/user/advocacia" element={ <AdvocaciasindexL/> }></Route>
        <Route path="/user/portais" element={ <PortaisindexL/> }></Route>
        <Route path="/tribunais/:id_tribunal/feedback/" element={<FeedTribunais/>}></Route>
        <Route path="/foruns/:id_forum/feedback/" element={<FeedForuns/>}></Route>
        <Route path="/juiz/:id_juiz/feedback/" element={<FeedAudiencias/>}></Route>
        <Route path="/mediador/:id_mediador/feedback/" element={<FeedMediacao/>}></Route>
        <Route path="/advocacia/:id_advocacia/feedback/" element={<FeedAdvocacias/>}></Route>
        <Route path="/portais/:id_portal/feedback/" element={<FeedPortais/>}></Route>
        <Route path="/user/" element={<HomeUser/>}></Route>
        <Route path="/user/tribunais/:id_tribunal/feedback/" element={<UFeedTribunais/>}></Route>
        <Route path="/user/tribunais/:id_tribunal/feedback/add" element={<FeedbackTribunalPai/>}></Route>
        <Route path="/user/foruns/:id_forum/feedback/" element={<UFeedForuns/>}></Route>
        <Route path="/user/foruns/:id_forum/feedback/add" element={<FeedbackForumPai/>}></Route>
        <Route path="/user/juiz/:id_juiz/feedback/" element={<UFeedAudiencias/>}></Route>
        <Route path="/user/juiz/:id_juiz/feedback/add" element={<FeedbackAudienciaPai/>}></Route>
        <Route path="/user/mediador/:id_mediador/feedback/" element={<UFeedMediacao/>}></Route>
        <Route path="/user/mediador/:id_mediador/feedback/add" element={<FeedbackMediacoesPai/>}></Route>
        <Route  path="/user/advocacia/:id_advocacia/feedback/" element={<UFeedAdvocacias/>}></Route>
        <Route path="/user/advocacia/:id_advocacia/feedback/add" element={<FeedbackAdvocaciaPai/>}></Route>
        <Route  path="/user/portais/:id_portal/feedback/" element={<UFeedPortais/>}></Route>
        <Route path="/user/portais/:id_portal/feedback/add" element={<FeedbackPortalPai/>}></Route>
        <Route
          path="/admin/dashboard/portais"
          element={<PortaisList onEdit={setPortaisEditado} />}
        />
        <Route 
          path="/admin/dashboard/portais/new"
          element={<PortaisForm portaisAtivo={null} onSave={() => {}} />}
        />
        <Route 
          path="/admin/dashboard/portais/edit"
          element={<PortaisForm portaisAtivo={portaisEditado} onSave={() => {}} onCancel={() => setPortaisEditado(null)} />}
        />
        <Route 
          path="/admin/dashboard/advocacia"
          element={<AdvocaciasList onEdit={setAdvocaciaEditado} />}
        />
        <Route 
          path="/admin/dashboard/advocacia/new"
          element={<AdvocaciasForm advocaciaAtivo={null} onSave={() => {}} />}
        />
        <Route 
          path="/admin/dashboard/advocacia/edit"
          element={<AdvocaciasForm advocaciaAtivo={advocaciaEditado} onSave={() => {}} onCancel={() => setAdvocaciaEditado(null)} />}
        />
        <Route
          path="/admin/dashboard/foruns"
          element={<ForunsList onEdit={setForumEditado} />}
        />
        <Route
          path="/admin/dashboard/foruns/new"
          element={<ForunsForm forumAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/foruns/edit"
          element={<ForunsForm forumAtivo={forumEditado} onSave={() => {}} onCancel={() => setForumEditado(null)} />}
        />

        <Route
          path="/admin/dashboard/juiz"
          element={<AudienciasList onEdit={setJuizEditado} />}
        />
        <Route
          path="/admin/dashboard/juiz/new"
          element={<AudienciasForm juizAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/juiz/edit"
          element={<AudienciasForm juizAtivo={juizEditado} onSave={() => {}} onCancel={() => setJuizEditado(null)} />}
        />
        <Route
          path="/admin/dashboard/mediador"
          element={<MediacoesList onEdit={setMediadorEditado} />}
        />
        <Route
          path="/admin/dashboard/mediador/new"
          element={<MediacoesForm mediadorAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/mediador/edit"
          element={<MediacoesForm mediadorAtivo={mediadorEditado} onSave={() => {}} onCancel={() => setMediadorEditado(null)} />}
        />

        {/* Rota para Tribunais */}
        <Route
          path="/admin/dashboard/tribunais"
          element={<TribunaisList onEdit={setTribunalEditado} />}
        />
        <Route
          path="/admin/dashboard/tribunais/new"
          element={<TribunaisForm tribunalAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/tribunais/edit"
          element={<TribunaisForm tribunalAtivo={tribunalEditado} onSave={() => {}} onCancel={() => setTribunalEditado(null)} />}
        />

        {/* Rota para Usuários */}
        <Route
          path="/usuarios"
          element={<UsuariosList onEdit={setUsuarioEditado} />}
        />
        <Route
          path="/usuarios/new"
          element={<UsuariosForm usuarioAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/usuarios/edit"
          element={<UsuariosForm usuarioAtivo={usuarioEditado} onSave={() => {}} onCancel={() => setUsuarioEditado(null)} />}
        />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;