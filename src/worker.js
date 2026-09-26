import { DurableObject } from "cloudflare:workers";

export class WatchRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
  }

  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("WebSocket endpoint", { status: 426 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    const id = crypto.randomUUID().slice(0, 12);

    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ id, name: "Guest" });

    return new Response(null, { status: 101, webSocket: client });
  }

  sockets() {
    return this.ctx.getWebSockets();
  }

  send(ws, payload) {
    try { ws.send(JSON.stringify(payload)); } catch {}
  }

  broadcast(payload, except = null) {
    for (const ws of this.sockets()) {
      if (ws !== except) this.send(ws, payload);
    }
  }

  async webSocketMessage(ws, message) {
    let data;
    try { data = JSON.parse(message); } catch { return; }

    const attachment = ws.deserializeAttachment() || { id: crypto.randomUUID().slice(0, 12), name: "Guest" };

    if (data.type === "hello") {
      const name = String(data.name || "Guest").replace(/[^a-zA-Z0-9 _-]/g, "").slice(0, 24) || "Guest";
      ws.serializeAttachment({ ...attachment, name });

      const peers = this.sockets()
        .filter(other => other !== ws)
        .map(other => other.deserializeAttachment())
        .filter(Boolean);

      this.send(ws, { type: "ready", id: attachment.id, peers });
      this.broadcast({ type: "peer-joined", peer: { id: attachment.id, name } }, ws);
      return;
    }

    if (data.type === "chat") {
      const text = String(data.text || "").trim().slice(0, 500);
      if (!text) return;
      this.broadcast({
        type: "chat",
        id: crypto.randomUUID(),
        from: attachment.id,
        name: attachment.name || "Guest",
        text,
        at: Date.now()
      });
      return;
    }

    if (data.type === "signal" && data.to) {
      const target = this.sockets().find(other => other.deserializeAttachment()?.id === data.to);
      if (target) {
        this.send(target, {
          type: "signal",
          from: attachment.id,
          name: attachment.name || "Guest",
          signal: data.signal
        });
      }
      return;
    }

    if (data.type === "room-control") {
      this.broadcast({
        type: "room-control",
        from: attachment.id,
        control: String(data.control || "").slice(0, 32)
      });
    }
  }

  async webSocketClose(ws) {
    const attachment = ws.deserializeAttachment();
    if (attachment?.id) {
      this.broadcast({ type: "peer-left", id: attachment.id });
    }
  }

  async webSocketError(ws) {
    await this.webSocketClose(ws);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/room/")) {
      const room = url.pathname.split("/").filter(Boolean).pop()?.toUpperCase();
      if (!room || !/^[A-Z0-9]{4,12}$/.test(room)) {
        return new Response("Invalid room", { status: 400 });
      }
      const id = env.ROOMS.idFromName(room);
      return env.ROOMS.get(id).fetch(request);
    }

    return env.ASSETS.fetch(request);
  }
};
