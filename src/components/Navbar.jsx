import React from 'react';
import { Code2, FolderGit2, Mail, Music} from "lucide-react";


export default function Navbar(){
    return (
        <header className="sticky top-4 z-50 max-w-4xl mx-auto px-4">
            <nav className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between">
                <a href="/" className="text-white font-bold flex items-center gap-2 hover:text-slate-400 transition-colors">
                    <Code2 className="w-6 h-6" />
                    <span className="text-white">Aesha</span>
                </a>

                <div className="flex items-center gap-6 text-sm text-slate-300">
                    <a href="#projects" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <FolderGit2 className="w-4 h-4" /> Proyek
                    </a>
                    <a href="#spotify" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <Music className="w-4 h-4" /> Music
                    </a>
                    <a href="#contact" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <Mail className="w-4 h-4" /> Kontak
                    </a>
                </div>
            </nav>
        </header>
    )
}