/* eslint-disable no-unused-expressions */
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const connectToRoom = (id) => {
  const doc = new Y.Doc();
  const map = doc.getMap();

  const roomId = "tldraw-p2p-eval";
  const provider = new WebrtcProvider(roomId, doc);

  map.observe((ymapEvent) => {
    ymapEvent.target === map; // => true

    // Find out what changed:
    // Option 1: A set of keys that changed
    ymapEvent.keysChanged; // => Set<strings>
    // Option 2: Compute the differences
    ymapEvent.changes.keys; // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

    // sample code.
    ymapEvent.changes.keys.forEach((change, key) => {
      if (change.action === "add") {
        console.log(
          `Property "${key}" was added. Initial value: "${map.get(key)}".`
        );
      } else if (change.action === "update") {
        console.log(
          `Property "${key}" was updated. New value: "${map.get(
            key
          )}". Previous value: "${change.oldValue}".`
        );
      } else if (change.action === "delete") {
        console.log(
          `Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`
        );
      }
    });
  });

  doc.transact(() => {
    map.set(id, new Date().getTime());
  }, id);
};

window.connectToRoom = connectToRoom;

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>If you see this page, the Yjs WebRTC code is working correctly.</p>
        <p>Peer ID: {process.env.REACT_APP_PEER_ID}</p>
      </header>
    </div>
  );
};

export default App;
