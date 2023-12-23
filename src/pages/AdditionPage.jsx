// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import './styles/Addition.css';
function AdditionPage() {
  const navigate = useNavigate();

  const goToDragDropAdd = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    navigate('/addition/dnd');
  };

  const goToSimpleAdd = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    navigate('/addition/simple');
  };

  return (
    <div>
      <header>
      <h2>Addition Page</h2>
      </header>
    <div className="Addition">
      
      <div className="container">
      <button className="btn btn-primary mx-4" onClick={goToDragDropAdd}>
        DragDropAdd
      </button>
      <button className="btn btn-secondary mx-4" onClick={goToSimpleAdd}>
        SimpleAdd 
      </button>
      </div>
    </div>
    </div>
  );
}

export default AdditionPage;
