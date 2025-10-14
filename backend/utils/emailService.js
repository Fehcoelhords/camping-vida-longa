const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingConfirmationEmail = async (booking) => {
  try {
    const { name, email, startDate, endDate, guests, bookingCode } = booking;
    const formattedStartDate = new Date(startDate).toLocaleDateString("pt-BR");
    const formattedEndDate = new Date(endDate).toLocaleDateString("pt-BR");

    // --- MUDANÇA IMPORTANTE AQUI ---
    // Em desenvolvimento, envia para o seu e-mail. Em produção, enviará para o e-mail do cliente.
    const recipientEmail =
      process.env.NODE_ENV === "production" ? email : process.env.DEV_EMAIL;

    console.log(`Enviando e-mail de confirmação para ${recipientEmail}...`);

    const { data, error } = await resend.emails.send({
      from: "Camping Vida Longa <onboarding@resend.dev>",
      to: [recipientEmail], // Usando a nova variável
      subject: "Sua Reserva no Camping Vida Longa foi Confirmada!",
      html: `... (o HTML do e-mail continua o mesmo) ...`,
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      return;
    }
    console.log("E-mail enviado com sucesso:", data);
  } catch (error) {
    console.error("Ocorreu uma exceção ao enviar o e-mail:", error);
  }
};
module.exports = { sendBookingConfirmationEmail };
