const { google } = require("googleapis");
const path = require("path");
const fs = require("fs").promises;

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

let oAuth2Client = null;

async function loadSavedCredentialsIfExist() {
  try {
    const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    try {
      const token = JSON.parse(await fs.readFile(TOKEN_PATH));
      client.setCredentials(token);
      return client;
    } catch (err) {
      return null;
    }
  } catch (err) {
    console.error("Erro ao carregar as credenciais:", err);
    return null;
  }
}

async function authorize(req, res) {
  const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.web;
  oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Autorize este app visitando a URL:", authUrl);
  res.redirect(authUrl);
}

async function handleGoogleCallback(req, res) {
  const code = req.query.code;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
    console.log("Token salvo em token.json");
    res.send("Autenticação bem-sucedida! Pode fechar esta aba.");
  } catch (err) {
    console.error("Erro ao obter o token de acesso", err);
    res.status(500).send("Falha na autenticação");
  }
}

async function createCalendarEvent(bookingDetails) {
  // LINHA DE DEPURAÇÃO ADICIONADA
  console.log("DADOS RECEBIDOS NO GOOGLE CONTROLLER:", bookingDetails);

  const auth = await loadSavedCredentialsIfExist();
  if (!auth) {
    console.log(
      "Cliente não autorizado. Execute o fluxo de autorização primeiro visitando /api/google/auth"
    );
    return;
  }

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: `Reserva Camping: ${bookingDetails.name}`,
    description: `Uma nova reserva foi confirmada para o Camping Vida Longa.
    
    Detalhes da Reserva:
    - Código: ${bookingDetails.bookingCode}
    - Tipo: ${bookingDetails.bookingType}
    - Valor Total: R$ ${bookingDetails.totalPrice.toFixed(2).replace(".", ",")}
    
    Detalhes do Cliente:
    - Nome: ${bookingDetails.name}
    - Email: ${bookingDetails.email}
    - Telefone: ${bookingDetails.phone}
    - Hóspedes: ${bookingDetails.guests}`,
    start: {
      dateTime: new Date(bookingDetails.startDate).toISOString(),
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: new Date(bookingDetails.endDate).toISOString(),
      timeZone: "America/Sao_Paulo",
    },
    attendees: [
      { email: bookingDetails.email, displayName: bookingDetails.name },
    ],
  };

  try {
    const res = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    console.log("Evento criado com sucesso: %s", res.data.htmlLink);
  } catch (err) {
    console.error("Erro ao criar o evento no calendário:", err);
  }
}

module.exports = { authorize, handleGoogleCallback, createCalendarEvent };
