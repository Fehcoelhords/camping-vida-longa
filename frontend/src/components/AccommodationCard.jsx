import React from "react";
import { motion } from "framer-motion";

function AccommodationCard({ image, title, description, delay }) {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className="bg-brand-green bg-opacity-40 rounded-lg overflow-hidden shadow-lg"
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold mb-2 text-main-text">
          {title}
        </h3>
        <p className="font-sans text-secondary-text">{description}</p>
      </div>
    </motion.div>
  );
}

export default AccommodationCard;
