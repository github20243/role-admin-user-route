import Routing from './routes/Routing'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Routing/>
      <ToastContainer />
    </div>
  )
}

export default App
