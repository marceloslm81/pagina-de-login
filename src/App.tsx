/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Cpu, Shield, Zap, Lock, User, Mail, ArrowRight, Activity, Globe, Anchor } from 'lucide-react';

const CyberBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 scanlines opacity-10" />
      
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-cyan-500/30 blur-[2px] z-10"
      />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute text-[8px] font-mono text-cyan-500/40"
        >
          {Math.random() > 0.5 ? '01' : '10'}
        </motion.div>
      ))}

      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
      />
    </div>
  );
};

const CyberInput = ({ icon: Icon, label, ...props }: any) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-500/60 ml-1 flex items-center gap-2">
      <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <Icon className="w-4 h-4 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
      </div>
      <input 
        {...props}
        className="w-full bg-black/40 border border-cyan-900/50 rounded-lg py-3 pl-10 pr-4 text-sm font-mono outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-cyan-900"
      />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30 rounded-tl-sm" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 rounded-br-sm" />
    </div>
  </div>
);

const PullString = ({ onTrigger, isLogin }: { onTrigger: () => void, isLogin: boolean }) => {
  const y = useMotionValue(0);
  const stringHeight = useTransform(y, [0, 150], [100, 250]);
  const opacity = useTransform(y, [0, 100], [0.4, 1]);

  return (
    <div className="absolute top-0 right-12 z-50 flex flex-col items-center pointer-events-none">
      {/* The String */}
      <motion.div 
        style={{ height: stringHeight }}
        className="w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]"
      />
      
      {/* The Handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 150 }}
        dragElastic={0.2}
        style={{ y }}
        onDragEnd={(_, info) => {
          if (info.point.y > 100) {
            onTrigger();
          }
          y.set(0);
        }}
        className="w-10 h-10 rounded-full border-2 border-cyan-500 bg-black flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto shadow-[0_0_15px_rgba(0,242,255,0.4)] group"
      >
        <motion.div style={{ opacity }}>
          <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
        </motion.div>
        
        {/* Tooltip */}
        <div className="absolute top-full mt-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-1 border border-cyan-900 rounded uppercase tracking-widest">
            Puxe para {isLogin ? 'Cadastrar' : 'Entrar'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  if (bootSequence) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-cyan-500 p-8">
        <div className="max-w-md w-full space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="">{">"} INICIALIZANDO LINK_NEURAL_V4.0</p>
            <p className="opacity-60">{">"} CARREGANDO MÓDULOS CENTRAIS...</p>
            <p className="opacity-40">{">"} ESTABELECENDO PROTOCOLO SEGURO</p>
          </motion.div>
          <div className="h-1 w-full bg-cyan-900/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#020202] selection:bg-cyan-500/30 overflow-hidden">
      <CyberBackground />
      
      {/* Pull String Interaction */}
      <PullString onTrigger={() => setIsLogin(!isLogin)} isLogin={isLogin} />

      <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 gap-0 bg-black/60 backdrop-blur-md border border-cyan-900/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="hidden lg:flex flex-col p-10 border-r border-cyan-900/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 border border-cyan-500/20 rounded-full animate-spin-slow" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Interface Neural</h3>
                  <p className="text-[10px] font-mono text-cyan-700">ID_NÓ: 0x7F2A90</p>
                </div>
              </div>

              <div className="space-y-2">
                <motion.h1 
                  key={isLogin ? 'login-title' : 'signup-title'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-mono font-bold tracking-tighter leading-none"
                >
                  {isLogin ? "ACESSO_RESTRITO" : "NOVA_ENTIDADE"}
                </motion.h1>
                <p className="text-cyan-500/60 font-mono text-xs max-w-[280px] leading-relaxed">
                  {isLogin 
                    ? "Por favor, forneça sua assinatura neural para acessar a rede central restrita."
                    : "Registre uma nova identidade dentro do coletivo neural descentralizado."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-cyan-700 uppercase">Integridade do Sistema</span>
                  <span className="text-cyan-400">99.9%</span>
                </div>
                <div className="h-1 w-full bg-cyan-900/30 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['80%', '100%', '90%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-full bg-cyan-500/50"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-900">
                <span>CAMADA_SEGURA_V2</span>
                <span>© 2026 LUMINA_CORP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-500 mb-1">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Protocolo: {isLogin ? 'Verificação' : 'Registro'}</span>
                </div>
                <h2 className="text-2xl font-mono font-bold uppercase tracking-tight">
                  {isLogin ? "Portal de Acesso" : "Criação de Identidade"}
                </h2>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <CyberInput icon={User} label="Nome da Entidade" placeholder="IDENTIFICADOR_001" />
                )}
                <CyberInput icon={Mail} label="Endereço Neural" placeholder="usuario@neural.net" />
                <CyberInput icon={Lock} label="Chave de Acesso" type="password" placeholder="••••••••" />

                <motion.button
                  onClick={handleAction}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,242,255,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-cyan-500 text-black font-mono font-bold py-4 rounded-lg flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>PROCESSANDO...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">{isLogin ? "INICIAR_SESSÃO" : "REGISTRAR_IDENTIDADE"}</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                </motion.button>
              </form>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-cyan-900/30" />
                <span className="text-[10px] font-mono text-cyan-900 uppercase">Links Externos</span>
                <div className="h-[1px] flex-1 bg-cyan-900/30" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-cyan-900/30 rounded-lg hover:bg-cyan-500/5 transition-all text-[10px] font-mono uppercase tracking-wider text-cyan-500">
                  <Shield className="w-3 h-3" />
                  Chave_Priv
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-cyan-900/30 rounded-lg hover:bg-cyan-500/5 transition-all text-[10px] font-mono uppercase tracking-wider text-cyan-500">
                  <Zap className="w-3 h-3" />
                  Sinc_Rápida
                </button>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-mono text-cyan-900 uppercase mb-2">Puxe a cordinha no topo para alternar</p>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[11px] font-mono text-cyan-700 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  {isLogin ? "[ Solicitar_Novo_Acesso ]" : "[ Retornar_ao_Portal ]"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl pointer-events-none" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-[0.03]" />
    </div>
  );
}
