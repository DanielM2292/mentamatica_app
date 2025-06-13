import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  // Rutas públicas que no requieren autenticación
  publicRoutes: [
    '/',
  ],
  
  // Rutas que siempre serán protegidas
  // PARA IR AGREGANDO OOOOOOJOOOOOO
  ignoredRoutes: [
    '/app/dashboard(.*)',
    '/profile(.*)',
    '/modules(.*)',
    '/admin(.*)',
  ],
  
  // Función para manejar redirecciones personalizadas
  afterAuth(auth, req) {
    // Si el usuario está autenticado y trata de acceder a una ruta pública
    if (auth.userId && auth.isPublicRoute) {
      // Redirigir desde la página principal o auth pages al dashboard
      if (req.nextUrl.pathname.startsWith('/sign-in') || 
          req.nextUrl.pathname.startsWith('/sign-up')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    
    // Si la ruta no es pública y el usuario no está autenticado
    if (!auth.userId && !auth.isPublicRoute) {
      // Redirigir al sign-in
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Permitir el acceso en otros casos
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Excluye archivos estáticos y rutas _next
    '/',
    '/(api|trpc)(.*)',
  ],
};