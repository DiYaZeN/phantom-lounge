export default async (request: Request, context: any) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new Response("Unauthorized - Phantom Lounge VIP Access Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Phantom Lounge VIP Sanctuary"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const match = authHeader.match(/^Basic\s+(.*)$/i);
  if (!match) {
    return new Response("Invalid Authorization format", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Phantom Lounge VIP Sanctuary"',
      },
    });
  }

  try {
    const credentials = atob(match[1]);
    const [user, pass] = credentials.split(":");

    // Credentials: phantom / lounge2025 or admin / phantomvip
    if (
      (user === "phantom" && pass === "lounge2025") ||
      (user === "admin" && pass === "phantomvip")
    ) {
      return context.next();
    }
  } catch {
    // Malformed base64
  }

  return new Response("Access Denied - Invalid Credentials", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Phantom Lounge VIP Sanctuary"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

export const config = {
  path: "/*",
};
