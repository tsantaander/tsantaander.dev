'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X } from 'lucide-react';
import AgentChat from './AgentChat';

export default function AgentModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-linear-to-br from-blue-700 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Abrir asistente virtual"
            >
                <Bot className="w-6 h-6 text-white" />
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="agent-modal-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60"
                    >
                        {/* Overlay con blur animado */}
                        <motion.div
                            onClick={() => setIsOpen(false)}
                            initial={{ backdropFilter: "blur(0px)" }}
                            animate={{ backdropFilter: "blur(4px)" }}
                            exit={{ backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute inset-0 bg-black/50"
                        />

                        {/* Contenido de la modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 w-[95vw] sm:w-[450px] h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-70 flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-linear-to-r from-blue-700 to-blue-600 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Asistente Virtual</h3>
                                        <p className="text-white/80 text-xs">Pregúntame sobre Tomás Santander</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-hidden">
                                <AgentChat />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}