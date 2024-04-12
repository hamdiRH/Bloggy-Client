import { Routes, Route, BrowserRouter } from 'react-router-dom';

import UserContextProvider from './contexts/UserContextProvider';

import NotFound from './pages/NotFound';
import { Home } from './pages/home';
import { Login, Register } from './pages/auth';
import { Article, CreateArticle } from './pages/article';

export function Router() {
  const token = localStorage.getItem("token") ?? ("" as string);
console.log(import.meta.env)
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new/' element={ token ? <CreateArticle /> : <Login />} />
          <Route path='/:username/article/:slug' element={<Article />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default Router;
