import { useState } from "react";
import GetMap from "./GetMap";
import Search from "./Search";

function App() {
  const position = {lat: '51.505', lon:'-0.09'};
  const [selectPosition, setSelectPosition] = useState(position);
  console.log(selectPosition);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "25vw",
          marginInline: "10px",
          marginTop: '10px',
        }}
      >
        <Search
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
      <div style={{ height: "100%", width: "75vw" }}>
        <GetMap selectPosition={selectPosition} />
      </div>
    </div>
  );
}

export default App;
