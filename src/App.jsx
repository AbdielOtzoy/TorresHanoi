import { useState } from "react";
import Tower from "./Tower";

function App() {
  const [numeroDiscos, setNumeroDiscos] = useState(1);
  const [discos1, setDiscos1] = useState([1]);
  const [discos2, setDiscos2] = useState([]);
  const [discos3, setDiscos3] = useState([]);
  const [movimientos, setMovimientos] = useState(0);
  const [movimientosMin, setMovimientosMin] = useState(1);
  const [isHold, setIsHold] = useState(false);
  const [position, setPosition] = useState(0);
  const [discoSeleccionado, setDiscoSeleccionado] = useState();
  const [isSolving, setIsSolving] = useState(false); // Add this state variable

  const handleChange = (e) => {
    if (isSolving) return; // If the game is being solved, don't change the number of disks
    setNumeroDiscos(e.target.value);
    const discosArray = Array.from({ length: e.target.value }, (_, i) => i + 1);
    setDiscos1(discosArray);
    setDiscos2([]);
    setDiscos3([]);
    setPosition(0);
    setMovimientos(0);
    setMovimientosMin(minMovs(e.target.value));
  };

  const minMovs = (n) => {
    return Math.pow(2, n) - 1;
  };

  // imprimir los movimientos necesarios para resolver la torre de Hanoi
  const delay = 1000; // 1 second

  const handleResolveHanoi = async (n, torre1, torre3, torre2) => {
    setIsSolving(true); // Set isSolving to true when the game starts solving
    if (n === 1) {
      await sleep(delay); // Wait for 1 second
      moveDisk(torre1, torre3, n);
    } else {
      await handleResolveHanoi(n - 1, torre1, torre2, torre3);
      await sleep(delay); // Wait for 1 second
      moveDisk(torre1, torre3, n);
      await handleResolveHanoi(n - 1, torre2, torre3, torre1);
    }
    setIsSolving(false); // Set isSolving to false when the game finishes solving
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const moveDisk = (from, to, disk) => {
    disk = parseInt(disk); // Convert disk to a number

    if (from === 1) {
      setDiscos1((discos1) => discos1.filter((disco) => disco !== disk));
    } else if (from === 2) {
      setDiscos2((discos2) => discos2.filter((disco) => disco !== disk));
    } else {
      setDiscos3((discos3) => discos3.filter((disco) => disco !== disk));
    }

    if (to === 1) {
      setDiscos1((discos1) => [disk, ...discos1]);
    } else if (to === 2) {
      setDiscos2((discos2) => [disk, ...discos2]);
    } else {
      setDiscos3((discos3) => [disk, ...discos3]);
    }
  };

  return (
    <main className="flex flex-col justify-center h-screen w-full p-8 gap-24">
      <div className="w-full flex justify-center items-center flex-col gap-5 max-md:mb-40">
        <div className="flex items-center justify-center space-x-2">
          <span>No. Discos: {numeroDiscos}</span>
          <input
            type="range"
            min={1}
            max={7}
            value={numeroDiscos}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-7 flex-col">
          <div className="flex items-center justify-center space-x-4 gap-5">
            <span>Movimientos: {movimientos}</span>
            <span>Mejor: {movimientosMin}</span>
          </div>
          <div className="flex justify-center">
            <button
              className="button w-full"
              onClick={() => handleResolveHanoi(numeroDiscos, 1, 3, 2)}
              disabled={isSolving} // Disable the button while the game is being solved
            >
              Resolver
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center md:px-8">
        <div className=" h-56 w-full">
          <div className="flex justify-center h-full w-full items-end md:flex-row max-md:gap-5 flex-col">
            <Tower
              discosArray={discos1}
              setDiscosArray={setDiscos1}
              position={1}
              setDiscoSeleccionado={setDiscoSeleccionado}
              currentPosition={position}
              isHold={isHold}
              discoSeleccionado={discoSeleccionado}
              setMovimientos={setMovimientos}
              setPosition={setPosition}
              setIsHold={setIsHold}
            />
            <Tower
              discosArray={discos2}
              setDiscosArray={setDiscos2}
              position={2}
              setDiscoSeleccionado={setDiscoSeleccionado}
              currentPosition={position}
              isHold={isHold}
              discoSeleccionado={discoSeleccionado}
              setMovimientos={setMovimientos}
              setPosition={setPosition}
              setIsHold={setIsHold}
            />
            <Tower
              discosArray={discos3}
              setDiscosArray={setDiscos3}
              setDiscoSeleccionado={setDiscoSeleccionado}
              position={3}
              currentPosition={position}
              isHold={isHold}
              discoSeleccionado={discoSeleccionado}
              setMovimientos={setMovimientos}
              setPosition={setPosition}
              setIsHold={setIsHold}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
