import AppRoutes from "./routes";
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (      
      <AuthProvider>
      <>
      <AppRoutes />
      
      </>
      </AuthProvider>
  );
}

export default App;




// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from "./contexts/AuthContext";
// import { PrivateRoute } from './components/ProtectedRoute';

// // Importações de páginas públicas
// import Home from "./pages/Home";
// import Login from './pages/Login';
// import Cadastro from './pages/Cadastro';
// import Sobre from "./pages/Sobre";

// // Importações de páginas de usuário
// import Forunsindex from "./pages/Foruns/Forunsindex";
// import Tribunaisindex from "./pages/Tribunais/Tribunaisindex";
// import Audienciasindex from "./pages/Audiencias/Audienciasindex";
// import Mediacoesindex from "./pages/Mediacoes/Mediacoesindex";
// import Advocaciaindex from "./pages/Advocacias/Advocaciasindex";
// import Portaisindex from "./pages/Portais/Portaisindex";
// import UnauthorizedPage from './pages/UnauthorizedPage';

// // Importações de páginas administrativas
// import ForunsList from "./pages/BDForuns/ForunsList";
// import ForunsForm from "./pages/BDForuns/ForunsForm";
// import AdvocaciasList from "./pages/BDAdvocacias/AdvocaciasList";
// import AdvocaciasForm from "./pages/BDAdvocacias/AdvocaciasForm";
// import TribunaisList from './pages/BDTribunais/TribunaisList';
// import TribunaisForm from './pages/BDTribunais/TribunaisForm';
// import AudienciasList from './pages/BDAudiencias/AudienciasList';
// import AudienciasForm from './pages/BDAudiencias/AudienciasForm';
// import PortaisList from "./pages/BDPortais/PortaisList";
// import PortaisForm from "./pages/BDPortais/PortaisForm";
// import MediacoesList from "./pages/BDMediacoes/MediacoesList";
// import MediacoesForm from "./pages/BDMediacoes/MediacoesForm";
// import UsuariosList from './pages/BDUsuarios/UsuariosList';
// import UsuariosForm from './pages/BDUsuarios/UsuariosForm';

// function App() {
//   const [forumEditado, setForumEditado] = useState(null);
//   const [tribunalEditado, setTribunalEditado] = useState(null);
//   const [juizEditado, setJuizEditado] = useState(null);
//   const [mediadorEditado, setMediadorEditado] = useState(null);
//   const [advocaciaEditado, setAdvocaciaEditado] = useState(null);
//   const [portaisEditado, setPortaisEditado] = useState(null);
//   const [usuarioEditado, setUsuarioEditado] = useState(null);

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           {/* Rotas Públicas */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/cadastro" element={<Cadastro />} />
//           <Route path="/info" element={<Sobre />} />

//           {/* Rotas de Usuário */}
//           <Route
//             path="/user/dashboard/tribunais"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Tribunaisindex />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/user/dashboard/foruns"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Forunsindex />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/user/dashboard/audiencias"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Audienciasindex />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/user/dashboard/mediacoes"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Mediacoesindex />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/user/dashboard/advocacia"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Advocaciaindex />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/user/dashboard/portais"
//             element={
//               <PrivateRoute allowedRoles={['user', 'admin']}>
//                 <Portaisindex />
//               </PrivateRoute>
//             }
//           />

//           {/* Rotas Administrativas */}
//           <Route
//             path="/admin/dashboard/portais"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <PortaisList onEdit={setPortaisEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/portais/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <PortaisForm portaisAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/portais/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <PortaisForm 
//                   portaisAtivo={portaisEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setPortaisEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />

//           {/* Rotas de Advocacia (Admin) */}
//           <Route
//             path="/admin/dashboard/advocacia"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AdvocaciasList onEdit={setAdvocaciaEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/advocacia/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AdvocaciasForm advocaciaAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/advocacia/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AdvocaciasForm 
//                   advocaciaAtivo={advocaciaEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setAdvocaciaEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />

//           {/* Demais rotas administrativas seguem o mesmo padrão */}
//           <Route
//             path="/admin/dashboard/foruns"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <ForunsList onEdit={setForumEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/foruns/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <ForunsForm forumAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/foruns/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <ForunsForm 
//                   forumAtivo={forumEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setForumEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/tribunais"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <TribunaisList onEdit={setTribunalEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/tribunais/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <TribunaisForm tribunalAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/tribunais/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <TribunaisForm 
//                   tribunalAtivo={tribunalEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setTribunalEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/juiz"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AudienciasList onEdit={setJuizEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/juiz/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AudienciasForm juizAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/juiz/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AudienciasForm 
//                   juizAtivo={juizEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setJuizEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/mediador"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <MediacoesList onEdit={setMediadorEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/mediador/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <MediacoesForm mediadorAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/mediador/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <MediacoesForm 
//                   mediadorAtivo={mediadorEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setMediadorEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/usuarios"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <UsuariosList onEdit={setUsuarioEditado} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/usuarios/new"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <UsuariosForm usuarioAtivo={null} onSave={() => {}} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin/dashboard/usuarios/edit"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <UsuariosForm 
//                   usuarioAtivo={usuarioEditado} 
//                   onSave={() => {}} 
//                   onCancel={() => setUsuarioEditado(null)} 
//                 />
//               </PrivateRoute>
//             }
//           />
          
//           {/* Adicione as demais rotas administrativas seguindo o mesmo padrão */}
          
//           {/* Rota para página não autorizada */}
//           <Route path="/unauthorized" element={<UnauthorizedPage />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
