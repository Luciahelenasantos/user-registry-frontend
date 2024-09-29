import { NavLink } from './nav-link'

export function Footer() {
  return (
    <footer className="mt-auto bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <p>&copy; 2024 User Application</p>
        <div className="flex space-x-4">
          <NavLink href="/" className="text-white hover:text-teal-300">
            Início
          </NavLink>
          <NavLink href="/users" className="text-white hover:text-teal-300">
            Usuários
          </NavLink>
          {/* outros links necessários aqui */}
        </div>
      </div>
    </footer>
  )
}
