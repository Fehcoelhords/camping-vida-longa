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

    // A lógica condicional foi removida.
    console.log(`Enviando e-mail de pré-reserva para o cliente: ${email}...`);

    await resend.emails.send({
      // Usamos o seu domínio verificado como remetente
      from: `Camping Vida Longa <contato@campingvidalonga.com.br>`,
      // E agora, SEMPRE usamos o e-mail do cliente como destinatário
      to: [email],
      subject:
        "Instruções para confirmar sua pré-reserva no Camping Vida Longa",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #FF7A00;">Olá, ${name}! Sua pré-reserva foi recebida!</h2>
          <p>Para confirmar sua vaga, é necessário o pagamento de 50% do valor total via Pix. Sua vaga ficará reservada por <strong>24 horas</strong>.</p>
          <hr style="border-color: #eee;">
          <h3>Detalhes da Pré-Reserva:</h3>
          <ul>
            <li><strong>Código da Reserva:</strong> <span style="font-size: 1.2em; font-weight: bold; color: #FF7A00;">${bookingCode}</span></li>
            <li><strong>Estadia:</strong> ${bookingType}</li>
            <li><strong>Período:</strong> ${formattedStartDate} a ${formattedEndDate}</li>
            <li><strong>Hóspedes:</strong> ${guests}</li>
            <li><strong>Valor Total da Estadia:</strong> R$ ${totalPrice
              .toFixed(2)
              .replace(".", ",")}</li>
            <li><strong>Valor do Sinal (50%):</strong> <strong style="font-size: 1.2em;">R$ ${depositAmount}</strong></li>
          </ul>
          <hr style="border-color: #eee;">
          <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px; text-align: center; border-left: 5px solid #FF7A00;">
            <h3 style="margin-top: 0;">Instruções para Pagamento via Pix</h3>
            <p style="font-size: 1em; color: #555;">Sua vaga ficará pré-reservada por <strong>24 horas</strong>.</p>
            <div style="margin: 20px 0;">
              <p style="margin: 0; font-size: 0.9em; color: #666;">Beneficiário:</p>
              <p style="margin: 0; font-size: 1.1em; font-weight: bold;">BIANCA ABREU DA SILVA</p>
              <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">Instituição:</p>
              <p style="margin: 0; font-size: 1.1em; font-weight: bold;">BANCO BRADESCO</p>
            </div>
            <p style="font-size: 1.1em;">Copie a chave abaixo:</p>
            <div style="background-color: #e0e0e0; padding: 10px 15px; border-radius: 5px; font-family: monospace; font-size: 1.2em; margin-top: 5px; display: inline-block;">
              +55 11 94736-7682
            </div>
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">(Chave Pix tipo Celular)</p>
          </div>
          <p style="margin-top: 25px;">Após o pagamento, por favor, envie o comprovante diretamente para a Bianca em nosso WhatsApp, clicando no botão abaixo.</p>
          <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Enviar Comprovante no WhatsApp</a>
          <br><br>
          <p>Atenciosamente,<br>Equipe Camping Vida Longa</p>
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
  try {
    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      console.error("OWNER_EMAIL não definido no .env");
      return;
    }
    const fromAddress = "sistema@campingvidalonga.com.br";
    console.log(`Enviando notificação para ${ownerEmail}...`);
    await resend.emails.send({
      from: `Sistema de Reservas <${fromAddress}>`,
      to: [ownerEmail],
      subject: `Nova Pré-Reserva Recebida! - ${booking.name} (${booking.bookingCode})`,
      html: `(O HTML completo do e-mail da Bianca vai aqui...)`,
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
