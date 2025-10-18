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

    console.log(`Enviando e-mail de pré-reserva para o cliente: ${email}...`);

    await resend.emails.send({
      from: `Camping Vida Longa <contato@campingvidalonga.com.br>`,
      to: [email],
      subject:
        "Instruções para confirmar sua pré-reserva no Camping Vida Longa",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #FF7A00;">Olá, ${name}! Sua pré-reserva foi recebida!</h2>
          <p>Sua vaga no paraíso está quase garantida! Para confirmar sua reserva, é necessário o pagamento antecipado de 50% do valor total.</p>
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
    const fromAddress = "sistema@campingvidalonga.com.br";
    const formattedStartDate = new Date(startDate).toLocaleDateString("pt-BR");
    const formattedEndDate = new Date(endDate).toLocaleDateString("pt-BR");
    const depositAmount = (totalPrice * 0.5).toFixed(2).replace(".", ",");

    console.log(`Enviando notificação para ${ownerEmail}...`);

    await resend.emails.send({
      from: `Sistema de Reservas <${fromAddress}>`,
      to: [ownerEmail],
      subject: `Nova Pré-Reserva Recebida! - ${name} (${bookingCode})`,
      // --- TEMPLATE HTML ATUALIZADO PARA A BIANCA ---
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #FF7A00;">Nova Pré-Reserva no Site!</h2>
          <p>Olá Bianca, uma nova pré-reserva foi solicitada e está aguardando a confirmação do pagamento pelo WhatsApp.</p>
          <hr style="border-color: #eee;">
          <h3 style="color: #333;">Detalhes do Cliente</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Nome:</strong> ${name}</li>
            <li><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefone/WhatsApp:</strong> ${phone}</li>
          </ul>
          <hr style="border-color: #eee;">
          <h3 style="color: #333;">Detalhes da Reserva</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Código da Reserva:</strong> <span style="font-size: 1.2em; font-weight: bold; color: #FF7A00;">${bookingCode}</span></li>
            <li><strong>Estadia:</strong> ${bookingType}</li>
            <li><strong>Período:</strong> ${formattedStartDate} a ${formattedEndDate}</li>
            <li><strong>Hóspedes:</strong> ${guests}</li>
            <li><strong>Valor Total:</strong> R$ ${totalPrice
              .toFixed(2)
              .replace(".", ",")}</li>
            <li><strong>Sinal a ser pago (50%):</strong> R$ ${depositAmount}</li>
          </ul>
          <hr style="border-color: #eee;">
          <p style="font-size: 0.9em; color: #777;">Aguarde o contato do cliente pelo WhatsApp com o comprovante de pagamento para confirmar a reserva no seu calendário.</p>
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
