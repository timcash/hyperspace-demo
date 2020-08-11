const HyperspaceClient = require("@hyperspace/client");
async function main() {
  const client_options = {
    host: "127.0.0.1",
  };
  const client = new HyperspaceClient(client_options);
  const corestore = client.corestore();
  const key_to_read_from = ""; // paste key from writer here after starting it
  const feed = corestore.get(key_to_read_from);
  await feed.ready();

  console.log(`Reading from:\n ${feed.key.toString("hex")}`);
  const network_options = {
    lookup: true,
    announce: true,
  };
  await client.network.configure(feed.discoveryKey, network_options);
  feed.on("peer-add", console.log);
  feed.createReadStream({ live: true }).on("data", log_stream);
}
main();

function log_stream(buffer) {
  console.log(`stream: ${buffer.toString()}`);
}
