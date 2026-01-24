const { sendFeedbackEmail } = require('../utils/emailService');

const submitFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (rating === undefined || rating === null) {
      res.status(400);
      throw new Error('A avaliação (estrelas) é obrigatória.');
    }

    // Validation (optional, can be stricter)
    if (rating < 0 || rating > 5) {
        res.status(400);
        throw new Error('A avaliação deve ser entre 0 e 5.');
    }

    await sendFeedbackEmail(rating, feedback);

    res.status(200).json({ message: 'Feedback enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar feedback:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  submitFeedback,
};
