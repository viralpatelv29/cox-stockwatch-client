# cox Stock Watcher (Front-End)

 Client that consumes the Scala/Play2 stock watcher backend service

## Prerequisites & Assumptions

- Install node, npm\yarn
	- The app was able to run on node `v8.15.0` and `v12.14.1`. I haven't tried other versions

- Install ember (`npm install -g ember-cli`)

### Steps to boot up the Ember app
Start the [backend stock watcher service](https://github.com/viralpatelv29/cox-stockwatch-backend/blob/main/README.md) first then...

1. Clone this repo locally
	- `git clone https://github.com/viralpatelv29/cox-stockwatch-backend.git
2. Navigate to the project root dir
	-  `cd cox-coding-exercise-client`
3. Download all project dependencies
	- `npm i`
4. Start the app
	- `ember serve` or `ember s`
	- Make sure you see `Build successful – Serving on http://localhost:4200/` and `Proxying to http://127.0.0.1:9000` in the build console output
5. Open `http://localhost:4200` in a browser (I recommend Chrome)

Functionality for average is pending and if time is permitted functionality will be completed if yahoo finance api provides expected average..
