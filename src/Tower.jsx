import PropTypes from "prop-types";

const Tower = ({
  discosArray,
  setDiscosArray,
  position,
  currentPosition,
  isHold,
  setDiscoSeleccionado,
  discoSeleccionado,
  setMovimientos,
  setPosition,
  setIsHold,
}) => {
  // obtener el menor disco de la torre
  const topDisco = discosArray[0];

  const onClick = () => {
    if (isHold) {
      // si la torre está vacía o el disco es menor al disco superior
      if (discosArray.length === 0 || discoSeleccionado < topDisco) {
        // agregar el disco a la torre
        if (discoSeleccionado !== undefined) {
          // comprobar que el disco se haya movido a una torre diferente
          if (position !== currentPosition) {
            setMovimientos((movimientos) => movimientos + 1);
          }
          setDiscosArray([discoSeleccionado, ...discosArray]);
          setIsHold(false);
          setPosition(position);
        } else {
          setIsHold(false);
          setPosition(position);
        }
      } else {
        if (discoSeleccionado > topDisco) {
          setIsHold(true);
          setPosition(currentPosition);
        } else {
          setIsHold(false);
          setPosition(position);
        }
      }
    } else {
      setDiscoSeleccionado(topDisco);
      setDiscosArray(discosArray.slice(1));
      setIsHold(!isHold);
      setPosition(position);
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full h-full justify-end ${
        position === currentPosition ? "border-2 border-slate-500" : ""
      }`}
      onClick={onClick}
    >
      <div></div>
      {/* Elemento visual que representa el palo */}
      <div className="w-3 h-56 bg-[#AB8026]" />

      {/* Contenedor de los discos */}
      <div className="flex flex-col justify-center items-center">
        {/* mostrar el disco seleccionado */}
        {isHold && position === currentPosition && discoSeleccionado && (
          <div
            className={`h-6 bg-blue-500 rounded-lg border-2 border-blue-900 ${
              isHold && position === currentPosition
                ? "border-4 border-slate-300 mb-2"
                : ""
            }`}
            style={{
              width: `${discoSeleccionado * 50}px`,
            }}
          />
        )}
        {discosArray.map((disco) => (
          <div
            key={disco}
            className={`h-6 bg-blue-500 rounded-lg border-2 border-blue-900`}
            style={{
              width: `${disco * 50}px`,
            }}
          />
        ))}
      </div>
      {/* base de la torre */}
      <div className="w-full min-h-3 bg-[#AB8026] mt-0" />
    </div>
  );
};

Tower.propTypes = {
  discosArray: PropTypes.arrayOf(PropTypes.number).isRequired, // 'discosArray' debe ser un array de números y requerido
  setDiscosArray: PropTypes.func.isRequired, // 'setDiscosArray' debe ser una función y requerida
  position: PropTypes.number.isRequired, // 'position' debe ser un número y requerido
  currentPosition: PropTypes.number.isRequired, // 'currentPosition' debe ser un número y requerido
  isHold: PropTypes.bool.isRequired, // 'isHold' debe ser un booleano y requerido
  setDiscoSeleccionado: PropTypes.func.isRequired, // 'setDiscoSeleccionado' debe ser una función y requerida
  discoSeleccionado: PropTypes.number, // 'discoSeleccionado' debe ser un número y requerido
  setMovimientos: PropTypes.func.isRequired, // 'setMovimientos' debe ser una función y requerida
  setPosition: PropTypes.func.isRequired, // 'setPosition' debe ser una función y requerida
  setIsHold: PropTypes.func.isRequired, // 'setIsHold' debe ser una función y requerida
};

export default Tower;
