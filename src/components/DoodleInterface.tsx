import React, { useRef, useState } from 'react';
import './DoodleInterface.css';

const pastelColors = [
  '#A7C7E7', // pastel blue
  '#B7E4C7', // gentle green
  '#F5E6C4', // warm beige
  '#E0BBE4', // lavender
  '#FFD6BA', // peach
];

const toolTypes = [
  { name: 'Pen', type: 'pen', icon: '✒️' },
  { name: 'Pencil', type: 'pencil', icon: '✏️' },
  { name: 'Eraser', type: 'eraser', icon: '🧽' },
  { name: 'Fill', type: 'fill', icon: '🪣' },
];

function DoodleInterface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState(toolTypes[0]);
  const [color, setColor] = useState(pastelColors[0]);
  const [customColor, setCustomColor] = useState('#000000');
  const [size, setSize] = useState(4);
  const [history, setHistory] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  // Drawing logic
  const startDrawing = (e: React.MouseEvent) => {
    setDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
    if (tool.type === 'fill') {
      fillCanvas();
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      if (tool.type === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = customColor || color;
      }
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const fillCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = customColor || color;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setHistory([...history.slice(0, step + 1), canvas.toDataURL()]);
      setStep(step + 1);
    }
  };

  const undo = () => {
    if (step > 0) {
      setStep(step - 1);
      restoreHistory(step - 1);
    }
  };

  const redo = () => {
    if (step < history.length - 1) {
      setStep(step + 1);
      restoreHistory(step + 1);
    }
  };

  const restoreHistory = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && history[index]) {
      const img = new window.Image();
      img.src = history[index];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const handleToolChange = (t: typeof toolTypes[0]) => setTool(t);
  const handleColorChange = (c: string) => setColor(c);

  const saveToJournal = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const img = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = img;
      link.download = 'doodle.png';
      link.click();
    }
  };

  return (
    <div className="doodle-bg">
      <div className="doodle-toolbar">
        <div>
          <span>Tool:</span>
          {toolTypes.map(t => (
            <button key={t.name} className={tool.name === t.name ? 'active' : ''} onClick={() => handleToolChange(t)} title={t.name}>{t.icon}</button>
          ))}
        </div>
        <div>
          <span>Color:</span>
          {pastelColors.map(c => (
            <button key={c} style={{ background: c }} className={color === c ? 'active' : ''} onClick={() => handleColorChange(c)} />
          ))}
          <input type="color" value={customColor} onChange={e => setCustomColor(e.target.value)} title="Color Wheel" style={{ marginLeft: '8px', width: '32px', height: '32px', border: 'none', background: 'none' }} />
        </div>
        <div>
          <span>Size:</span>
          <input type="range" min={1} max={40} value={size} onChange={e => setSize(Number(e.target.value))} style={{ width: '120px' }} />
          <span style={{ marginLeft: '8px' }}>{size}px</span>
        </div>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={saveToJournal}>Save to Journal</button>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={700}
        className="doodle-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default DoodleInterface;
