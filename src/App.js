import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [term, setTerm] = useState("");
  const [consejo, setConsejo] = useState("");
  const [advice, setAdvice] = useState(""); 

  const handleTermChange = (event) => setTerm(event.target.value);
  const handleConsejoChange = (event) => setConsejo(event.target.value);

  useEffect(() => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {setAdvice(response.data.slip.advice);})
      .catch((error) => console.log(error));}, []); 

  const getConsejo = () => {
    axios.get(`https://api.adviceslip.com/advice/search/${consejo}`)
      .then((response) => {
        if (response.data.slips && response.data.slips.length > 0) {
          setAdvice(response.data.slips[0].advice);
        } else {
          setAdvice("No se encontraron consejos para tu búsqueda.");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>

      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={() => {
          axios.get('https://api.adviceslip.com/advice')
            .then((response) => {setAdvice(response.data.slip.advice);})
            .catch((error) => console.log(error));
        }}>Obtener</button>
        <p className="result-box">{advice}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" value={consejo} onChange={handleConsejoChange} />
        
        <h3>Resultados de búsqueda:</h3>
        <button onClick={getConsejo}>Enviar</button>
        <p className="result-box">{advice}</p>
      </div>
    </main>
  );
}

export default App;
