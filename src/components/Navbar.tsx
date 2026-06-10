import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Book, Home, GraduationCap, Briefcase } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6" />
          <Link to="/" className="text-xl font-bold">Python数据分析AI训练平台</Link>
        </div>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center justify-evenly flex-1 max-w-2xl">
          <Link to="/" className="flex items-center justify-center space-x-1 hover:text-green-400 transition-colors">
            <Home className="h-4 w-4" />
            <span>首页</span>
          </Link>
          <Link to="/projects" className="flex items-center justify-center space-x-1 hover:text-green-400 transition-colors">
            <Briefcase className="h-4 w-4" />
            <span>实战项目</span>
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2 hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-5 w-5" />
              <span>首页</span>
            </Link>
            <Link to="/projects" className="flex items-center space-x-2 hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Briefcase className="h-5 w-5" />
              <span>实战项目</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
