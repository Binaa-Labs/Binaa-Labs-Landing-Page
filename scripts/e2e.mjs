import { spawn, spawnSync } from "node:child_process";
import http from "node:http";

const host = "127.0.0.1";
const port = 3005;
const url = `http://${host}:${port}`;

function waitForServer(deadlineMs = 120_000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - started > deadlineMs) {
          reject(new Error(`Timed out waiting for ${url}`));
          return;
        }
        setTimeout(check, 500);
      });
      req.setTimeout(1_000, () => {
        req.destroy();
      });
    };
    check();
  });
}

function stopServer(server) {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
      stdio: "ignore",
    });
    return;
  }
  server.kill("SIGTERM");
}

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "-H", host, "-p", String(port)],
  { stdio: ["ignore", "pipe", "pipe"] }
);

server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));

const cleanup = () => stopServer(server);
process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

try {
  await waitForServer();
  const test = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    { stdio: "inherit" }
  );
  const code = await new Promise((resolve) => test.on("exit", resolve));
  cleanup();
  process.exit(code ?? 1);
} catch (error) {
  console.error(error);
  cleanup();
  process.exit(1);
}
