/**
 * ENAJU — autenticação provisória do protótipo por HTTP Basic Auth.
 * Cloudflare Pages executa este middleware antes de TODAS as rotas,
 * inclusive /data/portfolio.json e os arquivos de estilos/scripts.
 * O site fica BLOQUEADO se os secrets não estiverem definidos.
 *
 * Configure como Secrets (não variáveis públicas) no Cloudflare Pages:
 *   ENAJU_BASIC_USER
 *   ENAJU_BASIC_PASSWORD
 * Nunca registre a senha no GitHub, neste arquivo ou no chat.
 *
 * Para usuários individuais e auditoria de acesso, substitua por
 * Cloudflare Access/Google Workspace antes de uso institucional.
 */

const TEXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
};

function blocked(message, status, challenge = false) {
  const headers = new Headers(TEXT_HEADERS);
  if (challenge) {
    headers.set('WWW-Authenticate', 'Basic realm="ENAJU - Painel de Projetos", charset="UTF-8"');
  }
  return new Response(message, { status, headers });
}

function parseBasic(value) {
  if (!/^Basic\s+/i.test(value || '') || value.length > 4096) return null;
  try {
    const encoded = value.replace(/^Basic\s+/i, '').trim();
    const decoded = atob(encoded);
    const bytes = Uint8Array.from(decoded, c => c.charCodeAt(0));
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const colon = text.indexOf(':');
    if (colon < 1) return null;
    return { user: text.slice(0, colon), pass: text.slice(colon + 1) };
  } catch {
    return null;
  }
}

async function equalConstantTime(a, b) {
  const digest = async value => new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  );
  const [left, right] = await Promise.all([digest(a), digest(b)]);
  let mismatch = 0;
  for (let i = 0; i < left.length; i++) mismatch |= left[i] ^ right[i];
  return mismatch === 0;
}

export async function onRequest({ request, env, next }) {
  const user = env?.ENAJU_BASIC_USER;
  const password = env?.ENAJU_BASIC_PASSWORD;
  if (typeof user !== 'string' || !user.trim() ||
      typeof password !== 'string' || !password) {
    return blocked('Painel ENAJU: acesso suspenso até a configuração das credenciais.', 503);
  }

  const received = parseBasic(request.headers.get('Authorization'));
  if (!received) return blocked('Acesso restrito. Informe usuário e senha.', 401, true);

  const [userOK, passwordOK] = await Promise.all([
    equalConstantTime(received.user, user),
    equalConstantTime(received.pass, password),
  ]);
  if (!userOK || !passwordOK) {
    return blocked('Credenciais inválidas.', 401, true);
  }

  // next() serve o arquivo protegido. Não permitir cache de respostas
  // autenticadas para evitar retenção indevida de dados administrativos.
  const original = await next();
  const headers = new Headers(original.headers);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('X-Frame-Options', 'DENY');
  return new Response(original.body, {
    status: original.status,
    statusText: original.statusText,
    headers,
  });
}