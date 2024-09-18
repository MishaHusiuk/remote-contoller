// import './App.css';

const handleClick = () => {
  fetch(`${process.env.REACT_APP_API_URL}/command`, { 
    method: 'POST', 
    body: JSON.stringify({
      command: 'ESC'
    })
  })
}

function App() {
  return (
    <div className="h-dvh">
      <div className="p-8 bg-gray-600 flex flex-col justify-between h-full">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-1">
            <button onClick={handleClick}>esc</button>
          </div>
          <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-2 col-span-2">
            <button onClick={() => alert('enter')}>enter</button>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-4 gap-4">
          <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-1 col-start-2">
            <button onClick={() => alert('up!')}>↑</button>
          </div>
          <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-1">
            <button onClick={() => alert('left!')}>←</button>
          </div>
          <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-3">
            <button onClick={() => alert('right!')}>→</button>
          </div>
          <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-2">
            <button onClick={() => alert('down!')}>↓</button>
          </div>
          <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-4 col-start-1 col-span-3">
            <button onClick={() => alert('space')}>space</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
