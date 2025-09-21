
import { Home } from 'lucide-react';
import homepage from '../components/homepage';
import Homepage from '../components/homepage';

function page() {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
          {/* {pills} */}
          <div className="absolute top-20 left-20 w-52 h-12 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full rotate-12 animate-float" />
          <div className="absolute top-40 right-32 w-24 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full -rotate-12 animate-float delay-1000" />
          <div className="absolute bottom-32 left-32 w-28 h-7 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full rotate-45 animate-float delay-2000" />
        </div>
    <Homepage />
      
      </div>
    </>
  );
}

export default page;
