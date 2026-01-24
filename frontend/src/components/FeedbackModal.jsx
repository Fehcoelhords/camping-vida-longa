import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FeedbackModal({ show, onClose }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Por favor, selecione uma nota de 1 a 5 estrelas.');
      return;
    }

    setIsSubmitting(true);
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await axios.post(`${apiUrl}/api/feedback`, { rating, feedback });
        toast.success('Obrigado pelo seu feedback!');
        onClose();
    } catch (error) {
        console.error('Erro ao enviar feedback:', error);
        toast.error('Erro ao enviar feedback. Tente novamente.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-dark-bg text-main-text rounded-lg shadow-2xl w-full max-w-md p-6 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-secondary-text hover:text-main-text"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-heading text-brand-orange mb-4 text-center">
                    Avalie sua Experiência 🏕️
                </h2>
                <p className="text-center text-secondary-text mb-6">
                    O que você está achando do nosso site de reservas?
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-6 space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="text-3xl focus:outline-none transition-transform hover:scale-110"
                            >
                                <FaStar
                                    className={
                                        star <= (hoverRating || rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-600'
                                    }
                                />
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 text-brand-green">
                            Tem alguma sugestão? (Opcional)
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full bg-main-bg text-main-text border border-brand-green rounded p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none h-32"
                            placeholder="Conte-nos o que poderia melhorar..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
