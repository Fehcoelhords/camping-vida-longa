import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Certifique-se de que você tem imagens na pasta 'assets/gallery'
// Se a pasta ou as imagens não existirem, o import vai falhar.
// Por segurança, vamos tratar o caso de as imagens não existirem.
import img1 from "../assets/gallery/gallery-1.jpg";
import img2 from "../assets/gallery/gallery-2.jpg";
import img3 from "../assets/gallery/gallery-3.jpg";
import img4 from "../assets/gallery/gallery-4.jpg";
import img5 from "../assets/gallery/gallery-5.jpg";
import img6 from "../assets/gallery/gallery-6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function ImageGallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedImg(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-dark-bg">
      <div className="container mx-auto">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          Momentos Inesquecíveis
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              onClick={() => setSelectedImg(image)}
            >
              <img
                src={image}
                alt={`Galeria do camping ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setSelectedImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImg}
              alt="Visualização ampliada"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ImageGallery;
