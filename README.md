# Multi host Hyperspace Demo

tested with node.js 12.18.3

### On the writer host

```sh
npm install hyperspace -g
hyperspace --host 127.0.0.1

git clone https://github.com/timcash/hyperspace-demo.git

cd hyperspace demo

npm install
node writer.js
```

### On the reader host

```sh
npm install hyperspace -g
hyperspace --host 127.0.0.1

git clone https://github.com/timcash/hyperspace-demo.git

cd hyperspace demo

npm install
node reader.js
```
