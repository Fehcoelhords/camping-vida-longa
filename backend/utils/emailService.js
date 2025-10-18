const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPreBookingEmailToCustomer = async (booking) => {
  try {
    const {
      name,
      email,
      startDate,
      endDate,
      guests,
      bookingCode,
      totalPrice,
      bookingType,
    } = booking;

    const formattedStartDate = new Date(startDate).toLocaleDateString("pt-BR");
    const formattedEndDate = new Date(endDate).toLocaleDateString("pt-BR");
    const depositAmount = (totalPrice * 0.5).toFixed(2).replace(".", ",");
    const ownerPhoneNumber = "5511947367682";
    const whatsappMessage = `Olá! Segue o comprovante da minha pré-reserva de código ${bookingCode}.`;
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    console.log(`Enviando e-mail de pré-reserva para ${email}...`);

    await resend.emails.send({
      from: "Camping Vida Longa <onboarding@resend.dev>",
      to: [
        process.env.NODE_ENV === "production" ? email : process.env.DEV_EMAIL,
      ],
      subject:
        "Instruções para confirmar sua pré-reserva no Camping Vida Longa",
      // --- CÓDIGO HTML REESTRUTURADO E SIMPLIFICADO ---
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
          <h2 style="color: #FF7A00;">Olá, ${name}! Sua pré-reserva foi recebida.</h2>
          <p>Para confirmar sua vaga, é necessário o pagamento de 50% do valor total via Pix. Sua vaga ficará reservada por <strong>24 horas</strong>.</p>
          
          <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Resumo da sua Pré-Reserva</h3>
            <p><strong>Código:</strong> ${bookingCode}</p>
            <p><strong>Período:</strong> ${formattedStartDate} a ${formattedEndDate}</p>
            <p><strong>Valor do Sinal (50%):</strong> R$ ${depositAmount}</p>
          </div>

          <div style="text-align: center; background-color: #f2f2f2; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0;">1. Faça o Pix</h3>
              <p style="font-size: 0.9em; color: #555;">Use a chave de celular abaixo:</p>
              <p style="font-family: monospace; font-size: 1.2em; background-color: #e0e0e0; padding: 10px; border-radius: 5px; display: inline-block;">+55 11 94736-7682</p>
              <p style="font-size: 0.9em; color: #555; margin-top: 5px;">(Bianca Abreu da Silva - Banco Bradesco)</p>
          </div>

          <div style="text-align: center; margin-top: 20px;">
              <h3 style="margin-top: 0;">2. Envie o Comprovante</h3>
              <p>Clique no botão abaixo para nos enviar o comprovante pelo WhatsApp e finalizar sua reserva.</p>
              <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
                ➡️ Enviar Comprovante no WhatsApp
              </a>
          </div>
          
          <br>
          <p style="font-size: 0.9em; color: #777;">Atenciosamente,<br>Equipe Camping Vida Longa</p>
        </div>
      `,
    });

    console.log(`E-mail para ${email} enviado com sucesso.`);
  } catch (error) {
    console.error(
      "Ocorreu uma exceção ao enviar o e-mail para o cliente:",
      error
    );
  }
};

const sendNewBookingNotificationToOwner = async (booking) => {
  // A função de notificação para a Bianca permanece a mesma
  try {
    const {
      name,
      email,
      phone,
      startDate,
      endDate,
      guests,
      bookingCode,
      totalPrice,
      bookingType,
    } = booking;
    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      console.error("OWNER_EMAIL não definido no .env");
      return;
    }
    const formattedStartDate = new Date(startDate).toLocaleDateString("pt-BR");
    const formattedEndDate = new Date(endDate).toLocaleDateString("pt-BR");
    const depositAmount = (totalPrice * 0.5).toFixed(2).replace(".", ",");
    console.log(`Enviando notificação para ${ownerEmail}...`);
    await resend.emails.send({
      from: "Sistema de Reservas <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `Nova Pré-Reserva Recebida! - ${name} (${bookingCode})`,
      html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Nova pré-reserva recebida no site!</h2>
                    <p>Aguardando confirmação de pagamento via WhatsApp.</p>
                    <hr>
                    <h3>Detalhes:</h3>
                    <ul>
                        <li><strong>Código:</strong> ${bookingCode}</li>
                        <li><strong>Cliente:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Telefone:</strong> ${phone}</li>
                        <li><strong>Período:</strong> ${formattedStartDate} a ${formattedEndDate}</li>
                        <li><strong>Hóspedes:</strong> ${guests}</li>
                        <li><strong>Tipo:</strong> ${bookingType}</li>
                        <li><strong>Valor do Sinal (50%):</strong> R$ ${depositAmount}</li>
                    </ul>
                </div>
            `,
    });
    console.log(`Notificação para ${ownerEmail} enviada com sucesso.`);
  } catch (error) {
    console.error("Ocorreu uma exceção ao enviar o e-mail para o dono:", error);
  }
};

module.exports = {
  sendPreBookingEmailToCustomer,
  sendNewBookingNotificationToOwner,
};
