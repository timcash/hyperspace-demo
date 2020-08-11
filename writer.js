const HyperspaceClient = require("@hyperspace/client");
async function main() {
  const client_options = {
    host: "127.0.0.1",
  };
  const client = new HyperspaceClient(client_options);
  const corestore = client.corestore();
  const feed = corestore.get(/* feed key here after 1st run to write to the same feed  */);
  await feed.ready();

  console.log("Share this key with readers:");
  console.log("************************************");
  console.log(feed.key.toString("hex"));
  console.log("************************************\n");

  const network_options = {
    lookup: true,
    announce: true,
  };
  await client.network.configure(feed.discoveryKey, network_options);
  feed.on("peer-add", console.log);
  feed.createReadStream({ live: true }).on("data", log_stream);

  for await (const value of sleep_tick(1000, 500)) {
    feed.append(Buffer.from(value.toString()));
  }
}
main();

async function* sleep_tick(time, count) {
  for (let i = 0; i < count; i++) {
    await sleep(time);
    yield i;
  }
}

async function sleep(time) {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
}

function log_stream(buffer) {
  console.log(`stream: ${buffer.toString()}`);
}
